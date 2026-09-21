import { readdir, readFile, mkdir, writeFile, rm, access } from "node:fs/promises";
import { resolve, join, dirname, relative } from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { createHash } from "node:crypto";
import {
  requireValue,
  requireText,
  requireId,
  uniqueById,
  safeUrl,
  validateMetadata,
  validateLesson,
  validateSelections,
  validateWriting,
  validateBlocks,
  validateDefinitionCoverage,
} from "./lib/validate.mjs";
import { loadAssets, mergeAssets, usedAssets } from "./lib/assets.mjs";
import { validateTermSet } from "./lib/terms.mjs";
import { resolveGlossary, selectGlossary } from "./lib/glossary.mjs";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const json = (value) => `${JSON.stringify(value, null, 2)}\n`;
const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
const directories = async (path) =>
  (await readdir(path, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
const readModule = async (path, name) => {
  const module = await import(pathToFileURL(path));
  requireValue(module[name] !== undefined, path, `expected an export named ${name}`);
  // Prevent executable values, undefined fields, and non-JSON data reaching the browser.
  JSON.stringify(module[name], (_, value) => {
    requireValue(
      !["function", "undefined", "symbol", "bigint"].includes(typeof value),
      path,
      "content exports must contain plain data",
    );
    requireValue(
      typeof value !== "number" || Number.isFinite(value),
      path,
      "numbers must be finite",
    );
    return value;
  });
  return structuredClone(module[name]);
};
const optionalModule = async (path, name, fallback) =>
  (await exists(path)) ? readModule(path, name) : fallback;
const topicSummary = (lesson) =>
  Object.fromEntries(
    [
      "id",
      "courseId",
      "unitId",
      "order",
      "code",
      "title",
      "period",
      "status",
      "summary",
    ].map((key) => [key, lesson[key]]),
  );
const blockReadingText = (block) => {
  if (!block || typeof block !== "object") return [];
  if (block.type === "paragraph" || block.type === "callout") return [block.text];
  if (block.type === "list") return block.items || [];
  if (block.type === "table")
    return [block.caption, ...(block.columns || []), ...(block.rows || []).flat()];
  return [];
};
const lessonReadingText = (lesson) =>
  [
    lesson.summary,
    lesson.bigIdea,
    lesson.context,
    ...(lesson.sections || []).flatMap((section) => [
      section.takeaway,
      ...(section.blocks || []).flatMap(blockReadingText),
    ]),
    ...(lesson.connections || []).flatMap((connection) => [
      connection.title,
      connection.body,
    ]),
  ]
    .filter(Boolean)
    .join("\n");
const guideReadingText = (guide) => {
  const strings = [];
  const collect = (value) => {
    if (typeof value === "string") strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === "object")
      Object.entries(value).forEach(([key, child]) => {
        if (!["sourceIds", "sourceLocators", "review", "id"].includes(key))
          collect(child);
      });
  };
  collect(guide);
  return strings.join("\n");
};
const compactSearchText = (value, limit = 360) => {
  const text = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= limit ? text : `${text.slice(0, limit - 1).trimEnd()}…`;
};
const stableBlockId = (block, sectionId, index) =>
  block?.id || `${sectionId}-block-${index + 1}`;

function topicSearchRecords({ course, unit, lesson, selectedGlossary }) {
  const records = [];
  const base = {
    courseId: course.id,
    unitId: unit.id,
    topicId: lesson.id,
    code: lesson.code,
    title: lesson.title,
    aliases: lesson.searchAliases || [],
  };
  records.push({
    id: lesson.id,
    type: "topic",
    ...base,
    text: [lesson.title, lesson.summary, lesson.bigIdea, lesson.context].join("\n"),
    excerpt: lesson.summary,
    route: `/topic/${lesson.id}`,
  });
  for (const section of lesson.sections || []) {
    const sectionText = [
      section.title,
      section.takeaway,
      ...(section.blocks || []).flatMap(blockReadingText),
    ]
      .filter(Boolean)
      .join("\n");
    records.push({
      id: `${lesson.id}/${section.id}`,
      type: "section",
      ...base,
      sectionId: section.id,
      heading: section.title,
      aliases: section.searchAliases || [],
      text: sectionText,
      excerpt: section.takeaway || sectionText,
      route: `/topic/${lesson.id}?section=${section.id}`,
    });
    for (const [index, block] of (section.blocks || []).entries()) {
      const text = blockReadingText(block).filter(Boolean).join(" ");
      if (!text || !["paragraph", "callout", "list"].includes(block.type)) continue;
      const blockId = stableBlockId(block, section.id, index);
      records.push({
        id: `${lesson.id}/${section.id}/${blockId}`,
        type: "passage",
        ...base,
        sectionId: section.id,
        blockId,
        heading: section.title,
        aliases: block.searchAliases || [],
        text,
        excerpt: compactSearchText(text),
        route: `/topic/${lesson.id}?section=${section.id}&block=${blockId}`,
      });
    }
  }
  for (const concept of selectedGlossary || []) {
    const phraseList = [concept.term, ...(concept.aliases || [])].map((phrase) =>
      String(phrase).toLocaleLowerCase("en"),
    );
    const location = (lesson.sections || []).find((section) =>
      [
        section.title,
        section.takeaway,
        ...(section.blocks || []).flatMap(blockReadingText),
      ]
        .filter(Boolean)
        .join(" ")
        .toLocaleLowerCase("en")
        .includes(phraseList[0]),
    );
    if (!location) continue;
    records.push({
      id: `${lesson.id}/glossary/${concept.id}`,
      type: "glossary",
      ...base,
      sectionId: location.id,
      heading: location.title,
      title: concept.term,
      aliases: concept.aliases || [],
      text: [concept.term, ...(concept.aliases || [])].join("\n"),
      excerpt: `Term used in ${location.title}.`,
      route: `/topic/${lesson.id}?section=${location.id}`,
    });
  }
  return records;
}

export async function compileContent(root = projectRoot) {
  const docsRoot = join(root, "docs"),
    contentRoot = join(docsRoot, "content");
  const output = new Map(),
    catalog = [],
    seenCourses = new Set();
  const emit = (path, data) => {
    requireValue(!output.has(path), path, "duplicate generated path");
    output.set(path, json(data));
  };
  const assetFile = join(contentRoot, "assets.js");
  const globalAssets = await loadAssets(
    await optionalModule(assetFile, "assets", []),
    assetFile,
    docsRoot,
  );

  for (const folder of await directories(contentRoot)) {
    const courseRoot = join(contentRoot, folder),
      courseFile = join(courseRoot, "course.js");
    if (!(await exists(courseFile))) continue;
    const course = await readModule(courseFile, "course");
    validateMetadata(course, courseFile);
    requireValue(
      /^[a-z][a-z0-9]*$/.test(course.id),
      courseFile,
      "course ID must be lowercase letters/digits, without hyphens; folder names may use hyphens",
    );
    requireValue(!seenCourses.has(course.id), courseFile, "duplicate course ID");
    seenCourses.add(course.id);
    requireValue(
      Number.isInteger(course.order) && course.order > 0,
      courseFile,
      "add a positive catalog order",
    );
    requireText(course.shortTitle, courseFile);
    requireText(course.description, courseFile);
    requireText(course.period, courseFile);
    const sourceList = await optionalModule(
      join(courseRoot, "sources.js"),
      "sources",
      [],
    );
    const sources = uniqueById(sourceList, `${folder}/sources.js`);
    for (const source of sourceList) {
      requireText(source.label, courseFile);
      if (source.url) safeUrl(source.url, courseFile);
    }
    const framework = await optionalModule(
      join(courseRoot, "framework.js"),
      "framework",
      null,
    );
    if (framework) {
      for (const field of ["id", "name", "title", "intro", "sourceNote"])
        requireText(framework[field], courseFile);
      const themeIds = new Set();
      for (const theme of framework.themes) {
        requireValue(!themeIds.has(theme.id), courseFile, "duplicate framework theme");
        themeIds.add(theme.id);
        for (const field of ["id", "shortTitle", "title", "question", "example"])
          requireText(theme[field], courseFile);
      }
    }
    const courseAssetsFile = join(courseRoot, "assets.js");
    const courseAssets = mergeAssets(
      globalAssets,
      await loadAssets(
        await optionalModule(courseAssetsFile, "assets", []),
        courseAssetsFile,
        docsRoot,
      ),
    );
    const units = [],
      topics = new Map(),
      questionIds = new Set(),
      customPracticePools = [];
    const routes = {
      unit: {},
      topic: {},
      quiz: {},
      guide: {},
      writing: {},
      terms: {},
      "term-set": {},
    };
    function route(type, id, path) {
      requireId(id, `${folder} route`);
      requireValue(
        id.startsWith(`${course.id}-`),
        folder,
        `route ID ${id} must start with ${course.id}-`,
      );
      requireValue(!routes[type][id], folder, `duplicate ${type} route ${id}`);
      routes[type][id] = path;
    }

    // One canonical set can serve multiple units, without copying its definitions.
    const termsRoot = join(courseRoot, "terms");
    const termSets = new Map();
    if (await exists(termsRoot)) {
      for (const filename of (await readdir(termsRoot))
        .filter((name) => name.endsWith(".js"))
        .sort()) {
        const file = join(termsRoot, filename);
        const set = await readModule(file, "termSet");
        validateTermSet(set, course.id, file);
        requireValue(!termSets.has(set.id), file, "duplicate term-set ID");
        set.revision = createHash("sha256")
          .update(json(set.cards))
          .digest("hex")
          .slice(0, 16);
        termSets.set(set.id, set);
        route("term-set", set.id, `${course.id}/terms/${set.id}.json`);
      }
    }

    // Discover topic folders once. All navigation and quiz ownership derive from these records.
    for (const unitFolder of await directories(courseRoot)) {
      const unitRoot = join(courseRoot, unitFolder),
        unitFile = join(unitRoot, "unit.js");
      if (!(await exists(unitFile))) continue;
      const unit = await readModule(unitFile, "unit");
      validateMetadata(unit, unitFile);
      requireValue(unit.courseId === course.id, unitFile, "wrong courseId");
      if (unit.status === "ready") requireText(unit.description, unitFile);
      requireText(unit.period, unitFile);
      requireValue(
        Number.isInteger(unit.number) && unit.number > 0,
        unitFile,
        "unit number must be positive",
      );
      const unitTopics = [];
      const reservedQuestionIds = new Set(
        (unit.quizzes || []).flatMap((quiz) =>
          (quiz.selections || []).flatMap((selection) => selection.questionIds || []),
        ),
      );
      if (await exists(join(unitRoot, "topics"))) {
        for (const topicFolder of await directories(join(unitRoot, "topics"))) {
          const topicRoot = join(unitRoot, "topics", topicFolder);
          const lesson = await readModule(join(topicRoot, "lesson.js"), "lesson");
          const bank = await readModule(join(topicRoot, "questions.js"), "bank");
          const topicAssetsFile = join(topicRoot, "assets.js");
          const assets = mergeAssets(
            courseAssets,
            await loadAssets(
              await optionalModule(topicAssetsFile, "assets", []),
              topicAssetsFile,
              docsRoot,
            ),
          );
          requireValue(
            lesson.unitId === unit.id && lesson.courseId === course.id,
            topicRoot,
            "topic ownership does not match its folder",
          );
          validateLesson(lesson, bank, sources, assets, framework, topicRoot, topics);
          requireValue(!topics.has(lesson.id), topicRoot, "duplicate topic ID");
          for (const question of bank.questions) {
            requireValue(
              !questionIds.has(question.id),
              topicRoot,
              `duplicate question ID ${question.id} in this course`,
            );
            questionIds.add(question.id);
          }
          const record = { lesson, bank, assets, unit };
          topics.set(lesson.id, record);
          unitTopics.push(record);
        }
      }
      requireValue(
        new Set(unitTopics.map((record) => record.lesson.order)).size ===
          unitTopics.length,
        unitFile,
        "topic order values must be unique within the unit",
      );
      unitTopics.sort((a, b) => a.lesson.order - b.lesson.order);
      units.push({ unit, unitRoot, topics: unitTopics });
    }
    uniqueById(
      units.map((record) => record.unit),
      courseFile,
    );
    requireValue(
      new Set(units.map((record) => record.unit.number)).size === units.length,
      courseFile,
      "unit numbers must be unique",
    );
    units.sort((a, b) => a.unit.number - b.unit.number);
    // Cross-topic links are checked after every topic in the course has been discovered.
    for (const topic of topics.values()) {
      for (const connection of topic.lesson.connections || []) {
        for (const target of connection.links || []) {
          const linked = topics.get(target.topicId);
          requireValue(
            linked?.lesson.status === "ready",
            courseFile,
            `broken connection topic ${target.topicId}`,
          );
          requireValue(
            linked.lesson.sections.some((section) => section.id === target.sectionId),
            courseFile,
            `broken connection section ${target.topicId}/${target.sectionId}`,
          );
        }
      }
    }
    const glossaryRoot = join(courseRoot, "glossary");
    const glossaryGroups = [];
    if (await exists(glossaryRoot)) {
      for (const filename of (await readdir(glossaryRoot))
        .filter((name) => name.endsWith(".js"))
        .sort()) {
        const file = join(glossaryRoot, filename);
        glossaryGroups.push({ file, glossary: await readModule(file, "glossary") });
      }
    }
    const glossary = resolveGlossary(glossaryGroups, {
      courseId: course.id,
      topics,
      sources,
    });
    const searchRecords = [];
    for (const set of termSets.values()) {
      const owners = units.filter(({ unit }) => unit.termSetIds?.includes(set.id));
      requireValue(owners.length > 0, termsRoot, `unreferenced term set ${set.id}`);
      emit(routes["term-set"][set.id], {
        course,
        set,
        units: owners.map(({ unit }) => ({
          id: unit.id,
          number: unit.number,
          title: unit.title,
        })),
      });
    }
    const readyTopics = [];
    for (const record of units) {
      const { unit, unitRoot } = record;
      const reservedQuestionIds = new Set(
        (unit.quizzes || []).flatMap((quiz) =>
          (quiz.selections || []).flatMap((selection) => selection.questionIds || []),
        ),
      );
      const guide = await optionalModule(join(unitRoot, "study-guide.js"), "guide", null);
      const writing = await optionalModule(
        join(unitRoot, "writing.js"),
        "writingQuizzes",
        [],
      );
      uniqueById(writing, unitRoot);
      const availableTopics = record.topics.filter(
        (topic) =>
          course.status === "ready" &&
          unit.status === "ready" &&
          topic.lesson.status === "ready",
      );
      readyTopics.push(...availableTopics.map((topic) => topicSummary(topic.lesson)));
      const setIds = unit.termSetIds || [];
      requireValue(
        Array.isArray(setIds) && new Set(setIds).size === setIds.length,
        unitRoot,
        "duplicate term-set references",
      );
      const unitTermSets = setIds.map((id) => {
        const set = termSets.get(id);
        requireValue(Boolean(set), unitRoot, `unknown term set ${id}`);
        return {
          id: set.id,
          title: set.title,
          source: set.source,
          count: set.cards.length,
        };
      });
      const unitInfo = {
        ...unit,
        quizzes: unit.status === "ready" ? unit.quizzes || [] : [],
        termSets: unitTermSets,
        topicQuizzes: availableTopics.flatMap(({ bank }) =>
          bank.quizzes
            .filter((quiz) => quiz.quizType === "topic")
            .map((quiz) => ({ id: quiz.id, title: quiz.title })),
        ),
        topicCount: availableTopics.length,
        firstTopic: availableTopics.length
          ? topicSummary(availableTopics[0].lesson)
          : null,
        hasGuide: Boolean(guide) && unit.status === "ready",
        writingQuizzes: (unit.status === "ready" ? writing : []).map((quiz) => ({
          id: quiz.id,
          title: quiz.title,
          partCount: quiz.parts?.length || quiz.responseFields?.length || 0,
          exerciseType: quiz.exerciseType || "saq",
          availability: quiz.availability || "available",
        })),
      };
      record.info = unitInfo;
      if (course.status === "ready" && unit.status === "ready") {
        searchRecords.push({
          id: unit.id,
          type: "unit",
          courseId: course.id,
          unitId: unit.id,
          title: unit.title,
          text: [unit.title, unit.description, unit.period].filter(Boolean).join("\n"),
          excerpt: unit.description,
          route: `/unit/${unit.id}`,
        });
      }
      route("unit", unit.id, `${course.id}/units/${unit.id}.json`);
      emit(routes.unit[unit.id], {
        course,
        unit: unitInfo,
        topics: record.topics.map((topic) => topicSummary(topic.lesson)),
      });
      // The set picker needs metadata only. Cards load when a set is selected.
      route("terms", unit.id, routes.unit[unit.id]);
      if (unit.status !== "ready") continue;
      for (const topic of availableTopics) {
        const { lesson, bank, assets } = topic;
        const context = {
          course,
          unit: unitInfo,
          topic: topicSummary(lesson),
          framework,
        };
        const lessonAssets = usedAssets(
          lesson.sections.flatMap((section) => section.blocks),
          assets,
        );
        const bankAssets = usedAssets(
          bank.questions.flatMap((question) => question.stimulusBlocks || []),
          assets,
        );
        const concepts = Object.fromEntries(
          lesson.sections.map((section) => [
            section.id,
            {
              id: section.id,
              title: section.conceptTitle,
              section: section.id,
              topicId: lesson.id,
            },
          ]),
        );
        const bankPath = `${course.id}/banks/${lesson.id}.json`;
        const selectedGlossary = selectGlossary(
          glossary,
          { topicIds: [lesson.id], ids: lesson.glossaryIds },
          lesson.id,
        );
        context.contentRevision = createHash("sha256")
          .update(json({ lesson, glossary: selectedGlossary }))
          .digest("hex")
          .slice(0, 16);
        emit(bankPath, { ...context, ...bank, concepts, assets: bankAssets });
        for (const quiz of bank.quizzes.filter(
          (candidate) =>
            candidate.quizType === "topic" && candidate.customPractice === true,
        )) {
          customPracticePools.push({
            id: `${lesson.id}:${quiz.id}`,
            quizId: quiz.id,
            courseId: course.id,
            unitId: unit.id,
            topicId: lesson.id,
            code: lesson.code,
            title: lesson.title,
            bankPath,
            questionIds: quiz.questionIds.filter((id) => !reservedQuestionIds.has(id)),
          });
        }
        for (const quiz of bank.quizzes) route("quiz", quiz.id, bankPath);
        route("topic", lesson.id, `${course.id}/topics/${lesson.id}.json`);
        emit(routes.topic[lesson.id], {
          ...context,
          lesson,
          bankPath,
          glossary: selectedGlossary,
          sources: lesson.sourceIds.map((id) => sources.get(id)),
          assets: lessonAssets,
        });
        searchRecords.push(
          ...topicSearchRecords({ course, unit, lesson, selectedGlossary }),
        );
        validateDefinitionCoverage({
          coverage: lesson.definitionCoverage,
          concepts: selectedGlossary,
          text: lessonReadingText(lesson),
          location: `${course.id}/${lesson.id}`,
          pageId: lesson.id,
        });
      }
      for (const quiz of unit.quizzes || []) {
        requireText(quiz.title, unitRoot);
        requireValue(
          quiz.courseId === course.id &&
            quiz.unitId === unit.id &&
            quiz.quizType === "unit",
          unitRoot,
          `wrong ownership or type on ${quiz.id}`,
        );
        const ids = [],
          bankPaths = [];
        for (const selection of quiz.selections) {
          const topic = topics.get(selection.topicId);
          requireValue(
            topic?.lesson.unitId === unit.id && topic?.lesson.status === "ready",
            unitRoot,
            `unavailable quiz topic ${selection.topicId}`,
          );
          validateSelections(
            selection.questionIds,
            new Map(topic.bank.questions.map((question) => [question.id, question])),
            unitRoot,
          );
          ids.push(...selection.questionIds);
          bankPaths.push(`${course.id}/banks/${selection.topicId}.json`);
        }
        requireValue(
          ids.length > 0 && new Set(ids).size === ids.length,
          unitRoot,
          "unit quiz needs unique questions",
        );
        route("quiz", quiz.id, `${course.id}/quizzes/${quiz.id}.json`);
        emit(routes.quiz[quiz.id], {
          course,
          unit: unitInfo,
          framework,
          quiz: { ...quiz, questionIds: ids },
          bankPaths: [...new Set(bankPaths)],
        });
      }
      if (guide) {
        for (const field of ["title", "headline", "essential"])
          requireText(guide[field], unitRoot);
        if (guide.overview) requireText(guide.overview, unitRoot);
        for (const item of guide.timeline) {
          requireText(item.date, unitRoot);
          requireText(item.text, unitRoot);
        }
        requireValue(
          Array.isArray(guide.pitfalls),
          unitRoot,
          "guide needs a pitfalls array",
        );
        guide.pitfalls.forEach((text) => requireText(text, unitRoot));
        if (guide.causalChains) {
          requireValue(
            Array.isArray(guide.causalChains) && guide.causalChains.length === 4,
            unitRoot,
            "guide needs four causal chains",
          );
          guide.causalChains.forEach((chain) => {
            requireText(chain.title, unitRoot);
            requireValue(
              Array.isArray(chain.steps) && chain.steps.length >= 3,
              unitRoot,
              "causal chain needs steps",
            );
            chain.steps.forEach((step) => requireText(step, unitRoot));
          });
        }
        if (guide.evidenceGuide) {
          requireValue(
            Array.isArray(guide.evidenceGuide) && guide.evidenceGuide.length === 12,
            unitRoot,
            "guide needs twelve evidence examples",
          );
          uniqueById(guide.evidenceGuide, `${unitRoot}.evidenceGuide`);
          guide.evidenceGuide.forEach((item) => {
            requireId(item.id, unitRoot);
            requireText(item.whereWhen, unitRoot);
            requireText(item.claim, unitRoot);
            requireText(item.limitation, unitRoot);
            (item.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown evidence source ${id}`),
            );
            const target = topics.get(item.review?.topicId);
            requireValue(
              target?.lesson.status === "ready" &&
                target.lesson.sections.some(
                  (section) => section.id === item.review.sectionId,
                ),
              unitRoot,
              `broken evidence review ${item.id}`,
            );
            requireText(item.review.label, unitRoot);
          });
        }
        if (guide.unit1Bridge) requireText(guide.unit1Bridge, unitRoot);
        if (guide.laterCallout) requireText(guide.laterCallout, unitRoot);
        validateBlocks([{ type: "table", ...guide.comparisons }], new Map(), unitRoot);
        const guideSources = guide.sourceIds.map((id) => {
          requireValue(sources.has(id), unitRoot, `unknown source ${id}`);
          return sources.get(id);
        });
        if (guide.networkData) {
          const {
            networks = [],
            places = [],
            connections = [],
            seasonalExamples = [],
            saharaPlans = [],
            comparisonPrompts = [],
          } = guide.networkData;
          requireValue(
            networks.length === 3,
            unitRoot,
            "network explorer needs three networks",
          );
          requireValue(
            places.length >= 12,
            unitRoot,
            "network explorer needs at least twelve places",
          );
          uniqueById(networks, `${unitRoot}.networkData.networks`);
          uniqueById(places, `${unitRoot}.networkData.places`);
          for (const network of networks) {
            requireId(network.id, unitRoot);
            requireText(network.label, unitRoot);
            requireValue(
              network.dimensions && Object.keys(network.dimensions).length === 8,
              unitRoot,
              `${network.id} needs eight comparison dimensions`,
            );
            Object.values(network.dimensions).forEach((value) =>
              requireText(value, unitRoot),
            );
            (network.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown network source ${id}`),
            );
          }
          for (const place of places) {
            requireId(place.id, unitRoot);
            requireText(place.name, unitRoot);
            requireValue(
              Array.isArray(place.networks) && place.networks.length > 0,
              unitRoot,
              `${place.id} needs network IDs`,
            );
            place.networks.forEach((id) =>
              requireValue(
                networks.some((network) => network.id === id),
                unitRoot,
                `unknown network ${id}`,
              ),
            );
            const target = topics.get(place.topicId);
            requireValue(
              target?.lesson.status === "ready" &&
                target.lesson.sections.some((section) => section.id === place.sectionId),
              unitRoot,
              `broken place review ${place.topicId}/${place.sectionId}`,
            );
            (place.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown place source ${id}`),
            );
            requireValue(
              Number.isFinite(place.coordinates?.latitude) &&
                Number.isFinite(place.coordinates?.longitude) &&
                place.coordinates.latitude >= -90 &&
                place.coordinates.latitude <= 90 &&
                place.coordinates.longitude >= -180 &&
                place.coordinates.longitude <= 180,
              unitRoot,
              `${place.id} needs valid geographic coordinates`,
            );
          }
          if (guide.networkData.mapSource) {
            (guide.networkData.mapSource.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown map source ${id}`),
            );
            requireText(guide.networkData.mapSource.label, unitRoot);
            requireText(guide.networkData.mapSource.note, unitRoot);
          }
          connections.forEach((connection) => {
            requireValue(
              Array.isArray(connection) &&
                connection.length === 2 &&
                connection.every((id) => places.some((place) => place.id === id)),
              unitRoot,
              "invalid network connection",
            );
          });
          seasonalExamples.forEach((example) => {
            requireId(example.id, unitRoot);
            requireText(example.label, unitRoot);
            requireText(example.outwardSeason, unitRoot);
            requireText(example.returnSeason, unitRoot);
            requireText(example.feedback, unitRoot);
            (example.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown seasonal source ${id}`),
            );
          });
          saharaPlans.forEach((plan) => {
            requireId(plan.id, unitRoot);
            requireText(plan.label, unitRoot);
            requireText(plan.choice, unitRoot);
            requireText(plan.feedback, unitRoot);
          });
          comparisonPrompts.forEach((prompt) => {
            requireId(prompt.id, unitRoot);
            requireText(prompt.prompt, unitRoot);
            requireText(prompt.model, unitRoot);
          });
        }
        if (guide.activities) {
          requireValue(
            Array.isArray(guide.activities) && guide.activities.length === 6,
            unitRoot,
            "Unit 2 needs six claim/evidence activities",
          );
          uniqueById(guide.activities, `${unitRoot}.activities`);
          guide.activities.forEach((activity) => {
            requireId(activity.id, unitRoot);
            requireText(activity.title, unitRoot);
            requireText(activity.claim, unitRoot);
            requireValue(
              Array.isArray(activity.options) && activity.options.length === 3,
              unitRoot,
              `${activity.id} needs options`,
            );
            requireValue(
              activity.options.filter((option) => option.correct).length === 1,
              unitRoot,
              `${activity.id} needs one correct option`,
            );
            activity.options.forEach((option) => {
              requireId(option.id, unitRoot);
              requireText(option.text, unitRoot);
              requireText(option.feedback, unitRoot);
            });
            (activity.sourceIds || []).forEach((id) =>
              requireValue(sources.has(id), unitRoot, `unknown activity source ${id}`),
            );
            const target = topics.get(activity.review?.topicId);
            requireValue(
              target?.lesson.status === "ready" &&
                target.lesson.sections.some(
                  (section) => section.id === activity.review.sectionId,
                ),
              unitRoot,
              `broken activity review ${activity.id}`,
            );
          });
        }
        route("guide", unit.id, `${course.id}/guides/${unit.id}.json`);
        const selectedGuideGlossary = selectGlossary(
          glossary,
          {
            topicIds: availableTopics.map(({ lesson }) => lesson.id),
            ids: guide.glossaryIds,
          },
          `${unit.id} guide`,
        );
        const guideRevision = createHash("sha256")
          .update(json({ guide, glossary: selectedGuideGlossary }))
          .digest("hex")
          .slice(0, 16);
        validateDefinitionCoverage({
          coverage: guide.definitionCoverage,
          concepts: selectedGuideGlossary,
          text: guideReadingText(guide),
          location: `${unitRoot}/study-guide.js`,
          pageId: `${unit.id}-guide`,
        });
        emit(routes.guide[unit.id], {
          course,
          unit: unitInfo,
          framework,
          guide,
          contentRevision: guideRevision,
          glossary: selectedGuideGlossary,
          sources: guideSources,
          topics: availableTopics.map(({ lesson }) => ({
            ...topicSummary(lesson),
            bigIdea: lesson.bigIdea,
            readingGuide: lesson.readingGuide || null,
          })),
        });
      }
      for (const quiz of writing) {
        validateWriting(quiz, topics, framework, unit, unitRoot, sources);
        route("writing", quiz.id, `${course.id}/writing/${quiz.id}.json`);
        emit(routes.writing[quiz.id], { course, unit: unitInfo, framework, quiz });
      }
    }
    const catalogEntry = {
      ...course,
      readyTopicCount: readyTopics.length,
      previewTopics: readyTopics.slice(0, 3),
      firstTopic: readyTopics[0] || null,
      indexPath: `${course.id}/index.json`,
      routesPath: `${course.id}/routes.json`,
      customPracticePath: `${course.id}/custom-practice.json`,
    };
    if (course.status === "ready" && readyTopics.length) {
      searchRecords.unshift({
        id: course.id,
        type: "course",
        courseId: course.id,
        title: course.title,
        text: [course.title, course.shortTitle, course.description, course.period]
          .filter(Boolean)
          .join("\n"),
        excerpt: course.description,
        route: `/course/${course.id}`,
      });
    }
    emit(catalogEntry.indexPath, {
      course: catalogEntry,
      units: units.map((record) => record.info),
    });
    emit(catalogEntry.routesPath, routes);
    const customPracticeRevision = createHash("sha256")
      .update(json(customPracticePools))
      .digest("hex")
      .slice(0, 16);
    emit(catalogEntry.customPracticePath, {
      schemaVersion: 1,
      courseId: course.id,
      revision: customPracticeRevision,
      pools: customPracticePools,
    });
    // Search is compact, per-course, and never contains assessment or private work.
    const searchRevision = createHash("sha256")
      .update(json(searchRecords))
      .digest("hex")
      .slice(0, 16);
    emit(`${course.id}/search.json`, {
      schemaVersion: 1,
      courseId: course.id,
      revision: searchRevision,
      records: searchRecords.map((record) => ({
        ...record,
        excerpt: compactSearchText(record.excerpt),
      })),
    });
    catalog.push(catalogEntry);
  }
  catalog.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
  const revision = createHash("sha256")
    .update(json([...output]))
    .digest("hex")
    .slice(0, 16);
  emit("catalog.json", { schemaVersion: 1, revision, courses: catalog });
  return output;
}

export async function buildContent({ root = projectRoot, check = false } = {}) {
  const output = await compileContent(root),
    outputRoot = join(root, "docs/generated");
  const paths = [...output.keys()].sort();
  const manifestPath = join(outputRoot, "manifest.json");
  const previous = (await exists(manifestPath))
    ? JSON.parse(await readFile(manifestPath, "utf8"))
    : [];
  const stale = previous.filter((path) => !paths.includes(path));
  for (const [path, data] of output) {
    const file = join(outputRoot, path);
    if (check) {
      requireValue(
        (await exists(file)) && (await readFile(file, "utf8")) === data,
        path,
        "generated data is stale; run npm run build",
      );
    } else {
      await mkdir(dirname(file), { recursive: true });
      await writeFile(file, data);
    }
  }
  if (check) {
    requireValue(
      stale.length === 0 && json(previous) === json(paths),
      "generated manifest",
      "run npm run build to update generated paths",
    );
  } else {
    for (const path of stale) {
      requireValue(
        !relative(outputRoot, resolve(outputRoot, path)).startsWith(".."),
        "generated manifest",
        "unsafe stale path",
      );
      await rm(join(outputRoot, path), { force: true });
    }
    await writeFile(manifestPath, json(paths));
  }
  const searchSizes = paths
    .filter((path) => path.endsWith("/search.json"))
    .map((path) => Buffer.byteLength(output.get(path)));
  const searchReport = searchSizes.length
    ? ` Search indexes: ${searchSizes.length}; largest ${Math.max(...searchSizes)} bytes.`
    : "";
  console.log(
    `${check ? "Validated" : "Built"} ${paths.length} content files. Catalog: ${Buffer.byteLength(output.get("catalog.json"))} bytes.${searchReport}`,
  );
  return output;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildContent({ check: process.argv.includes("--check") });
}
