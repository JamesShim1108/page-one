// PSAT/SAT prep HTML: the test-selection page, one page per test, and the item
// renderer shared by every future practice mode. Views return strings and
// escape all authored text.
import { escapeHtml as esc, link, arrow, badge, breadcrumbs } from "../ui.js";
import { CHOICE_IDS, GRID_IN, NOT_AFFILIATED, scaleLabel } from "./engine.js";

const FORMAT_LABELS = {
  "single-select": "Multiple choice",
  "grid-in": "Student-produced response",
};

const crumbs = (tail) =>
  breadcrumbs([
    ["Home", "/"],
    ["PSAT / SAT", tail ? "/test-prep" : ""],
    ...(tail ? [[tail]] : []),
  ]);

function sectionLine(section) {
  return `${section.questions} questions · ${section.minutes} min · ${section.modules} modules`;
}

function itemStatus(count) {
  return count > 0
    ? badge("ready", `${count} practice ${count === 1 ? "item" : "items"}`)
    : badge("soon", "Items in preparation");
}

function scaleNote(test) {
  return test.scale.family === "psat89"
    ? "PSAT 8/9 has its own scale. Page One never shows a PSAT 8/9 estimate as equal to a PSAT 10, PSAT/NMSQT, or SAT score."
    : "Page One reports practice estimates on this scale only.";
}

function sourcesList(index, ids) {
  const sources = ids
    .map((id) => index.sources.find((source) => source.id === id))
    .filter(Boolean);
  if (!sources.length) return "";
  return `<ul class="tp-sources">${sources
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a></li>`,
    )
    .join("")}</ul>`;
}

function notice(index, ids) {
  return `<aside class="tp-notice" aria-label="About this practice">
    <p>${esc(index.notice || NOT_AFFILIATED)}</p>
    <p class="muted">Test formats, timing, score ranges, and skill names follow these official descriptions:</p>
    ${sourcesList(index, ids)}
  </aside>`;
}

function testCard(test) {
  const scale = scaleLabel(test);
  const titleId = `tp-${esc(test.id)}-title`;
  return `<article class="tp-test-card" aria-labelledby="${titleId}">
    <p class="eyebrow">${esc(test.audience)}</p>
    <h2 id="${titleId}">${esc(test.title)}</h2>
    <p class="tp-test-description">${esc(test.description)}</p>
    <dl class="tp-facts">
      <div><dt>Score scale</dt><dd>${esc(scale.total)} <span class="muted">(sections ${esc(scale.section)})</span></dd></div>
      ${test.sections.map((section) => `<div><dt>${esc(section.title)}</dt><dd>${esc(sectionLine(section))}</dd></div>`).join("")}
    </dl>
    ${test.scale.family === "psat89" ? `<p class="tp-scale-note">${esc(scaleNote(test))}</p>` : ""}
    <div class="tp-card-foot">${itemStatus(test.itemCount)}<span class="tp-card-actions">${fullReady(test) ? link(`/test-practice/${test.id}?mode=full`, `Full test ${arrow}`, "btn") : ""}${link(`/test-prep/${test.id}`, `View skills ${arrow}`, "btn secondary")}</span></div>
  </article>`;
}

export function testPrepIndexPage({ testPrep }) {
  const allSourceIds = testPrep.sources.map((source) => source.id);
  return `<div class="container tp-page">${crumbs()}
    <div class="page-intro"><p class="eyebrow">PSAT / SAT prep</p><h1>Choose your test.</h1>
      <p>Each test lists its sections, skill domains, and timing. Practice items are written by Page One to match official question types.</p></div>
    <div class="tp-test-grid">${testPrep.tests.map(testCard).join("")}</div>
    ${notice(testPrep, allSourceIds)}
  </div>`;
}

const practicePath = (test, query) => `/test-practice/${test.id}?${query}`;

function skillRow(test, skill) {
  const variants = skill.variants?.length
    ? `<span class="muted"> (${esc(skill.variants.map((variant) => variant.title).join(", "))})</span>`
    : "";
  const title = skill.itemCount
    ? `<a href="#${esc(practicePath(test, `skill=${skill.id}`))}" class="tp-skill-link">${esc(skill.title)}</a>`
    : esc(skill.title);
  const count = skill.itemCount
    ? `${skill.itemCount}<span class="visually-hidden"> ${skill.itemCount === 1 ? "item" : "items"}</span>`
    : '<span class="visually-hidden">No items yet</span>–';
  return `<li class="tp-skill"><span>${title}${variants}</span><span class="tp-skill-count">${count}</span></li>`;
}

function sectionActions(test, section) {
  if (!section.itemCount) return "";
  const module = section.moduleReady
    ? link(
        practicePath(test, `section=${section.id}&mode=module`),
        `Timed module · ${section.moduleSize} questions, ${section.moduleMinutes} min ${arrow}`,
        "btn",
      )
    : `<span class="btn disabled" aria-disabled="true">Timed module · needs more items</span>`;
  return `<div class="actions tp-section-actions">${module}${link(practicePath(test, `section=${section.id}`), `Practice all ${section.itemCount} ${arrow}`, "btn secondary")}</div>`;
}

function sectionBlock(test, section) {
  return `<section class="tp-section" aria-labelledby="tp-section-${esc(section.id)}">
    <div class="section-heading"><div><h2 id="tp-section-${esc(section.id)}">${esc(section.title)}</h2>
      <p class="muted">${esc(sectionLine(section))} · ${esc(section.formats.map((format, index) => (index ? FORMAT_LABELS[format].toLowerCase() : FORMAT_LABELS[format])).join(" and "))}</p></div>${itemStatus(section.itemCount)}</div>
    ${sectionActions(test, section)}
    <div class="tp-domain-grid">${section.domains
      .map(
        (
          domain,
        ) => `<article class="tp-domain"><div class="tp-domain-head"><h3>${esc(domain.title)}</h3>${domain.itemCount ? link(practicePath(test, `domain=${domain.id}`), `Practice ${arrow}`, "text-link") : ""}</div>
        <ul class="tp-skill-list" aria-label="${esc(domain.title)} skills">${domain.skills.map((skill) => skillRow(test, skill)).join("")}</ul></article>`,
      )
      .join("")}</div>
  </section>`;
}

const fullReady = (test) => test.sections.every((section) => section.fullReady);

function fullTestCard(test) {
  if (!fullReady(test)) return "";
  const questions = test.sections.reduce((sum, section) => sum + section.questions, 0);
  const minutes = test.sections.reduce((sum, section) => sum + section.minutes, 0);
  return `<section class="tp-full-card" aria-labelledby="tp-full-card-title">
    <div><p class="eyebrow">Full-length practice test</p><h2 id="tp-full-card-title">Take the whole test, start to finish</h2>
    <p>${questions} original questions in two adaptive sections, ${Math.floor(minutes / 60)} hours ${minutes % 60} minutes plus a 10-minute break, with a practice estimate at the end. Progress is saved in this browser.</p></div>
    ${link(`/test-practice/${test.id}?mode=full`, `Start practice test ${arrow}`, "btn")}
  </section>`;
}

export function testPrepTestPage({ testPrep, test }) {
  const scale = scaleLabel(test);
  const others = testPrep.tests.filter((item) => item.id !== test.id);
  return `<div class="container tp-page">${crumbs(test.title)}
    <div class="page-intro"><p class="eyebrow">${esc(test.audience)}</p><h1>${esc(test.title)}</h1><p>${esc(test.description)}</p></div>
    <div class="tp-scale" role="note"><p><strong>Score scale:</strong> ${esc(scale.total)} total, ${esc(scale.section)} per section.</p><p class="muted">${esc(scaleNote(test))}</p></div>
    ${fullTestCard(test)}
    ${test.sections.map((section) => sectionBlock(test, section)).join("")}
    <nav class="tp-other-tests" aria-label="Other tests"><p class="eyebrow">Other tests</p>${others.map((item) => link(`/test-prep/${item.id}`, esc(item.title), "text-link")).join("")}</nav>
    ${notice(testPrep, test.sourceIds)}
  </div>`;
}

// ---------------------------------------------------------------------------
// Item renderer.
//
// state: { response, checked, problem, result }
//   response: choice ID ("A"-"D") or the grid-in text
//   checked:  true after the student checks a well-formed answer
//   problem:  an entry-format message for a grid-in, shown instead of feedback
//   result:   { correct } from checkResponse
//
// mode:
//   "practice" (default): Check answer, then feedback
//   "test": answers stay editable and no feedback appears (timed modules)
//   "review": the answer is shown as checked, with feedback, and cannot change

const itemDomId = (item) => `tp-item-${item.id}`;
const BLANK =
  '<span class="tp-blank"><span class="visually-hidden">blank</span><span aria-hidden="true">______</span></span>';

function citation(source) {
  return `${esc(source.author)}, <cite>${esc(source.title)}</cite> (${esc(source.publication)}, ${esc(source.year)})`;
}

// Marks a blank or an underlined portion inside escaped text. Each appears once.
function markLine(line, marks) {
  for (const { text, html } of marks) {
    if (!text || !line.includes(text)) continue;
    const [before, after] = line.split(text);
    return `${markLine(before, marks)}${html(text)}${markLine(after, marks)}`;
  }
  return esc(line);
}

// Paragraphs split on blank lines; single line breaks are kept, for verse and
// for bulleted notes.
function paragraphs(text, { blank, underline } = {}) {
  const marks = [
    blank && { text: blank, html: () => BLANK },
    underline && {
      text: underline,
      html: (words) =>
        `<span class="tp-underline"><span class="visually-hidden">Underlined: </span>${esc(words)}<span class="visually-hidden"> (end of underlined portion)</span></span>`,
    },
  ].filter(Boolean);
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => {
      const lines = paragraph
        .trim()
        .split("\n")
        .map((line) => markLine(line.trim(), marks));
      return `<p>${lines.join("<br>")}</p>`;
    })
    .join("");
}

const sourceLink = (source) =>
  `${citation(source)}. <a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">Source text</a>`;

function sourcedPassage(passage, { label = "", intro = "", marks } = {}) {
  return `<figure class="tp-passage">${label ? `<p class="tp-passage-label">${esc(label)}</p>` : ""}${intro ? `<p class="tp-passage-intro">${esc(intro)}</p>` : ""}<blockquote>${paragraphs(passage.text, marks)}</blockquote>
      <figcaption>${sourceLink(passage.source)}</figcaption></figure>`;
}

function passageView(item) {
  const marks = { blank: item.blank, underline: item.underline };
  if (item.passages)
    return item.passages
      .map((passage, index) =>
        sourcedPassage(passage, { label: `Text ${index + 1}`, intro: passage.intro }),
      )
      .join("");
  if (item.passage)
    return sourcedPassage(item.passage, {
      intro: [item.passage.intro, item.context].filter(Boolean).join(" "),
      marks,
    });
  if (item.originalText)
    return `<div class="stimulus tp-original"><p class="eyebrow">Written by Page One for practice</p>${paragraphs(item.originalText, marks)}${item.quoteSource ? `<p class="tp-quote-source">Quotations: ${sourceLink(item.quoteSource)}</p>` : ""}</div>`;
  return "";
}

// ---------------------------------------------------------------------------
// Figures, drawn as SVG from data so they scale and follow the theme.

const fmt = (value) => String(Number(value.toFixed(4)));

function axisValues(axis) {
  const list = [];
  for (let value = axis.min; value <= axis.max + 1e-9; value += axis.step)
    list.push(Number(value.toFixed(6)));
  return list;
}

let clipCount = 0;

function plotSvg(figure) {
  const width = 440;
  const height = 360;
  const pad = { left: 44, right: 18, top: 18, bottom: 40 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const { x, y } = figure;
  const sx = (value) => pad.left + ((value - x.min) / (x.max - x.min)) * w;
  const sy = (value) => pad.top + h - ((value - y.min) / (y.max - y.min)) * h;
  const xs = axisValues(x);
  const ys = axisValues(y);
  const everyX = Math.ceil(xs.length / 11);
  const everyY = Math.ceil(ys.length / 11);
  const grid = [
    ...xs.map(
      (value) =>
        `<line class="tp-fig-grid" x1="${fmt(sx(value))}" x2="${fmt(sx(value))}" y1="${pad.top}" y2="${pad.top + h}"/>`,
    ),
    ...ys.map(
      (value) =>
        `<line class="tp-fig-grid" x1="${pad.left}" x2="${pad.left + w}" y1="${fmt(sy(value))}" y2="${fmt(sy(value))}"/>`,
    ),
  ].join("");
  // Axes sit at zero when zero is in range, otherwise along the edge.
  const zeroX = x.min <= 0 && x.max >= 0;
  const zeroY = y.min <= 0 && y.max >= 0;
  const axisY = zeroX ? sx(0) : pad.left;
  const axisX = zeroY ? sy(0) : pad.top + h;
  const axes = `<line class="tp-fig-axis" x1="${pad.left}" x2="${pad.left + w}" y1="${fmt(axisX)}" y2="${fmt(axisX)}"/><line class="tp-fig-axis" x1="${fmt(axisY)}" x2="${fmt(axisY)}" y1="${pad.top}" y2="${pad.top + h}"/>`;
  const xTicks = xs
    .map((value, index) =>
      index % everyX === 0 && !(value === 0 && zeroX && zeroY)
        ? `<text class="tp-fig-tick" x="${fmt(sx(value))}" y="${fmt(axisX + 15)}" text-anchor="middle">${esc(fmt(value))}</text>`
        : "",
    )
    .join("");
  const yTicks = ys
    .map((value, index) =>
      index % everyY === 0 && !(value === 0 && zeroX && zeroY)
        ? `<text class="tp-fig-tick" x="${fmt(axisY - 6)}" y="${fmt(sy(value) + 4)}" text-anchor="end">${esc(fmt(value))}</text>`
        : "",
    )
    .join("");
  const origin =
    zeroX && zeroY
      ? `<text class="tp-fig-tick" x="${fmt(axisY - 6)}" y="${fmt(axisX + 15)}" text-anchor="end">0</text>`
      : "";
  clipCount += 1;
  const clip = `tp-clip-${clipCount}`;
  const lines = (figure.lines || [])
    .map(
      (line) =>
        `<polyline class="tp-fig-line${line.dashed ? " is-dashed" : ""}" points="${line.points.map(([px, py]) => `${fmt(sx(px))},${fmt(sy(py))}`).join(" ")}"/>`,
    )
    .join("");
  const points = (figure.points || [])
    .map(
      ([px, py]) =>
        `<circle class="tp-fig-point" cx="${fmt(sx(px))}" cy="${fmt(sy(py))}" r="4"/>`,
    )
    .join("");
  const labels = (figure.labels || [])
    .map(
      (label) =>
        `<text class="tp-fig-label" x="${fmt(sx(label.at[0]) + 6)}" y="${fmt(sy(label.at[1]) - 6)}">${esc(label.text)}</text>`,
    )
    .join("");
  const xLabel = x.label
    ? `<text class="tp-fig-axis-label" x="${pad.left + w / 2}" y="${height - 4}" text-anchor="middle">${esc(x.label)}</text>`
    : "";
  const yLabel = y.label
    ? `<text class="tp-fig-axis-label" transform="translate(12 ${pad.top + h / 2}) rotate(-90)" text-anchor="middle">${esc(y.label)}</text>`
    : "";
  return `<svg class="tp-figure-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(figure.alt)}"><defs><clipPath id="${clip}"><rect x="${pad.left}" y="${pad.top}" width="${w}" height="${h}"/></clipPath></defs>${grid}${axes}<g clip-path="url(#${clip})">${lines}${points}</g>${xTicks}${yTicks}${origin}${labels}${xLabel}${yLabel}</svg>`;
}

function barsSvg(figure) {
  const width = 440;
  const height = 340;
  const pad = {
    left: 52,
    right: 14,
    top: 16,
    bottom: figure.series.length > 1 ? 60 : 40,
  };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const { y } = figure;
  const sy = (value) => pad.top + h - ((value - y.min) / (y.max - y.min)) * h;
  const ticks = axisValues(y);
  const every = Math.ceil(ticks.length / 11);
  const grid = ticks
    .map(
      (value, index) =>
        `<line class="tp-fig-grid" x1="${pad.left}" x2="${pad.left + w}" y1="${fmt(sy(value))}" y2="${fmt(sy(value))}"/>${index % every === 0 ? `<text class="tp-fig-tick" x="${pad.left - 6}" y="${fmt(sy(value) + 4)}" text-anchor="end">${esc(fmt(value))}</text>` : ""}`,
    )
    .join("");
  const group = w / figure.categories.length;
  const barWidth = (group * 0.7) / figure.series.length;
  const bars = figure.categories
    .map((category, index) => {
      const start = pad.left + group * index + group * 0.15;
      const columns = figure.series
        .map(
          (series, position) =>
            `<rect class="tp-fig-bar tp-fig-bar-${position}" x="${fmt(start + barWidth * position)}" y="${fmt(sy(series.values[index]))}" width="${fmt(barWidth - 2)}" height="${fmt(sy(y.min) - sy(series.values[index]))}"/>`,
        )
        .join("");
      return `${columns}<text class="tp-fig-tick" x="${fmt(pad.left + group * (index + 0.5))}" y="${pad.top + h + 16}" text-anchor="middle">${esc(category)}</text>`;
    })
    .join("");
  const legend =
    figure.series.length > 1
      ? figure.series
          .map(
            (series, position) =>
              `<rect class="tp-fig-bar tp-fig-bar-${position}" x="${pad.left + position * 150}" y="${height - 18}" width="12" height="12"/><text class="tp-fig-tick" x="${pad.left + position * 150 + 18}" y="${height - 8}">${esc(series.name)}</text>`,
          )
          .join("")
      : "";
  const yLabel = y.label
    ? `<text class="tp-fig-axis-label" transform="translate(12 ${pad.top + h / 2}) rotate(-90)" text-anchor="middle">${esc(y.label)}</text>`
    : "";
  return `<svg class="tp-figure-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(figure.alt)}">${grid}<line class="tp-fig-axis" x1="${pad.left}" x2="${pad.left + w}" y1="${fmt(sy(y.min))}" y2="${fmt(sy(y.min))}"/>${bars}${legend}${yLabel}</svg>`;
}

function shapesSvg(figure) {
  const margin = 1;
  const scale = 360 / Math.max(figure.width + margin * 2, figure.height + margin * 2);
  const width = (figure.width + margin * 2) * scale;
  const height = (figure.height + margin * 2) * scale;
  const px = ([x, y]) => [(x + margin) * scale, height - (y + margin) * scale];
  const at = (point) => px(point).map(fmt).join(",");
  const polygons = (figure.polygons || [])
    .map(
      (polygon) =>
        `<polygon class="tp-fig-shape" points="${polygon.points.map(at).join(" ")}"/>`,
    )
    .join("");
  const segments = (figure.segments || [])
    .map((segment) => {
      const [x1, y1] = px(segment.from);
      const [x2, y2] = px(segment.to);
      return `<line class="tp-fig-shape${segment.dashed ? " is-dashed" : ""}" x1="${fmt(x1)}" y1="${fmt(y1)}" x2="${fmt(x2)}" y2="${fmt(y2)}"/>`;
    })
    .join("");
  const circles = (figure.circles || [])
    .map((circle) => {
      const [cx, cy] = px(circle.center);
      return `<circle class="tp-fig-shape" cx="${fmt(cx)}" cy="${fmt(cy)}" r="${fmt(circle.r * scale)}"/>`;
    })
    .join("");
  const marks = (figure.rightAngles || [])
    .map((mark) => {
      const size = 0.35;
      const unit = (to) => {
        const dx = to[0] - mark.at[0];
        const dy = to[1] - mark.at[1];
        const length = Math.hypot(dx, dy) || 1;
        return [(dx / length) * size, (dy / length) * size];
      };
      const [ax, ay] = unit(mark.toward[0]);
      const [bx, by] = unit(mark.toward[1]);
      const corner = [mark.at[0] + ax, mark.at[1] + ay];
      const far = [mark.at[0] + ax + bx, mark.at[1] + ay + by];
      const other = [mark.at[0] + bx, mark.at[1] + by];
      return `<polyline class="tp-fig-shape tp-fig-thin" points="${[corner, far, other].map(at).join(" ")}"/>`;
    })
    .join("");
  const points = (figure.points || [])
    .map((point) => {
      const [cx, cy] = px(point);
      return `<circle class="tp-fig-point" cx="${fmt(cx)}" cy="${fmt(cy)}" r="3.5"/>`;
    })
    .join("");
  const labels = (figure.labels || [])
    .map((label) => {
      const [lx, ly] = px(label.at);
      return `<text class="tp-fig-label${label.italic ? " is-italic" : ""}" x="${fmt(lx)}" y="${fmt(ly)}" text-anchor="middle" dominant-baseline="middle">${esc(label.text)}</text>`;
    })
    .join("");
  return `<svg class="tp-figure-svg tp-figure-shapes" viewBox="0 0 ${fmt(width)} ${fmt(height)}" role="img" aria-label="${esc(figure.alt)}">${polygons}${segments}${circles}${marks}${points}${labels}</svg>`;
}

export function figureView(figure) {
  if (!figure) return "";
  const svg =
    figure.type === "plot"
      ? plotSvg(figure)
      : figure.type === "bars"
        ? barsSvg(figure)
        : shapesSvg(figure);
  return `<figure class="tp-figure">${figure.title ? `<p class="tp-figure-title">${esc(figure.title)}</p>` : ""}${svg}${figure.note ? `<figcaption class="muted">${esc(figure.note)}</figcaption>` : ""}</figure>`;
}

function tableView(table) {
  if (!table) return "";
  const note =
    table.data === "illustrative"
      ? "Illustrative data written for practice."
      : `Data: ${table.data.label}`;
  return `<div class="tp-table-wrap"><table class="tp-table"><caption>${esc(table.title)}</caption>
    <thead><tr>${table.columns.map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead>
    <tbody>${table.rows.map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table><p class="tp-table-note muted">${esc(note)}</p></div>`;
}

// With an eliminator, each choice gets a cross-out button, as on the digital
// test. A crossed-out choice stays readable and can be restored.
function choicesView(item, state, locked, { eliminator = false, eliminated = [] } = {}) {
  const name = `${itemDomId(item)}-answer`;
  const checked = state.checked === true;
  return `<fieldset class="choices" aria-labelledby="${itemDomId(item)}-stem"><legend class="visually-hidden">Choose one answer</legend>
    ${item.choices
      .map((choice) => {
        const selected = state.response === choice.id;
        const correct = checked && choice.id === item.answer;
        const wrong = checked && selected && !correct;
        const mark = correct ? "Correct answer" : wrong ? "Your answer" : "";
        const out = eliminated.includes(choice.id);
        const control = eliminator
          ? `<button type="button" class="elimination-control" data-tp-eliminate="${esc(choice.id)}" aria-pressed="${out}" aria-label="${out ? "Restore" : "Cross out"} choice ${esc(choice.id)}">${out ? "Undo" : `<s>${esc(choice.id)}</s>`}</button>`
          : "";
        return `<div class="choice-row ${out ? "is-eliminated" : ""}"><label class="choice ${correct ? "correct" : wrong ? "incorrect" : ""}">
        <input type="radio" name="${esc(name)}" value="${esc(choice.id)}" data-tp-choice ${selected ? "checked" : ""} ${locked ? "disabled" : ""}>
        <span class="choice-letter" aria-hidden="true">${esc(choice.id)}</span>
        <span><span class="visually-hidden">${esc(choice.id)}. ${out ? "Crossed out. " : ""}</span>${esc(choice.text)}</span>
        ${mark ? `<span class="answer-mark">${mark}</span>` : ""}
      </label>${control}</div>`;
      })
      .join("")}
  </fieldset>`;
}

function gridInView(item, state, locked, mode) {
  const inputId = `${itemDomId(item)}-entry`;
  const rulesId = `${itemDomId(item)}-rules`;
  const problemId = `${itemDomId(item)}-problem`;
  const checked = state.checked === true;
  const status = checked ? (state.result?.correct ? "correct" : "incorrect") : "";
  // Timed modules preview the entry as the student types, like an answer preview.
  const live =
    mode === "test"
      ? `<p id="${problemId}" class="tp-grid-in-problem" data-tp-live aria-live="polite">${esc(state.problem || "")}</p>`
      : state.problem
        ? `<p id="${problemId}" class="tp-grid-in-problem" role="alert">${esc(state.problem)}</p>`
        : "";
  return `<div class="tp-grid-in ${status}">
    <label for="${inputId}">Your answer</label>
    <input id="${inputId}" class="tp-grid-in-input" type="text" inputmode="decimal" autocomplete="off" autocapitalize="off" spellcheck="false"
      maxlength="${GRID_IN.maxNegativeLength + 2}" value="${esc(state.response || "")}" data-tp-entry
      aria-describedby="${rulesId}${live ? ` ${problemId}` : ""}" ${state.problem ? 'aria-invalid="true"' : ""} ${locked ? "readonly" : ""}>
    <p id="${rulesId}" class="tp-grid-in-rules muted">Up to ${GRID_IN.maxPositiveLength} characters, or ${GRID_IN.maxNegativeLength} for a negative answer. Use a fraction such as 7/2 or a decimal such as 3.5. Mixed numbers are not accepted.</p>
    ${live}
  </div>`;
}

function feedbackView(item, state) {
  if (!state.checked) return "";
  const correct = state.result?.correct === true;
  const unanswered = state.result?.answered === false;
  const answer =
    item.format === "grid-in"
      ? `<p><strong>Accepted answers:</strong> ${item.acceptedAnswers.map((entry) => `<code>${esc(entry)}</code>`).join(", ")}</p>`
      : correct
        ? ""
        : `<p><strong>Correct answer:</strong> ${esc(item.answer)}. ${esc(item.choices.find((choice) => choice.id === item.answer).text)}</p>`;
  const rationales =
    item.format === "single-select"
      ? `<details class="choice-explanations" ${correct ? "" : "open"}><summary>Why the other choices miss</summary><ul>${CHOICE_IDS.filter(
          (id) => id !== item.answer,
        )
          .map(
            (id) => `<li><strong>${esc(id)}.</strong> ${esc(item.rationales[id])}</li>`,
          )
          .join("")}</ul></details>`
      : "";
  const heading = correct ? "✓ Correct" : unanswered ? "– Not answered" : "✗ Incorrect";
  return `<div class="answer-feedback ${correct ? "" : "wrong"}" id="${itemDomId(item)}-feedback" tabindex="-1" role="status">
    <h4>${heading}</h4>${answer}
    <p><strong>Why:</strong> ${esc(item.explanation)}</p>${rationales}
  </div>`;
}

export function itemView(
  item,
  state = {},
  {
    heading = "h2",
    number = null,
    mode = "practice",
    footer = null,
    total = null,
    eliminator = false,
    eliminated = [],
  } = {},
) {
  const checked = state.checked === true;
  const locked = mode === "review" || (mode === "practice" && checked);
  const canCheck =
    !checked &&
    (item.format === "grid-in"
      ? String(state.response || "").trim() !== ""
      : Boolean(state.response));
  const meta = [
    number ? `Question ${number}${total ? ` of ${total}` : ""}` : "",
    item.skillTitle,
    FORMAT_LABELS[item.format],
  ]
    .filter(Boolean)
    .join(" · ");
  const instruction =
    mode === "test"
      ? item.format === "grid-in"
        ? "Type your answer. You can change it until you submit."
        : "Choose an answer. You can change it until you submit."
      : checked
        ? "Read the explanation, then continue."
        : item.format === "grid-in"
          ? "Type your answer, then check it."
          : "Choose an answer, then check it.";
  const buttons =
    mode === "practice" && !checked
      ? `<button type="submit" class="btn" ${canCheck ? "" : "disabled"}>Check answer</button>${footer || ""}`
      : (footer ??
        (mode === "practice"
          ? `<button type="button" class="btn secondary" data-tp-action="retry">Try again</button>`
          : ""));
  return `<form class="question-card tp-item" id="${esc(itemDomId(item))}" data-tp-item="${esc(item.id)}" data-tp-mode="${esc(mode)}" novalidate>
    <p class="question-meta">${esc(meta)}</p>
    ${passageView(item)}${tableView(item.table)}${figureView(item.figure)}
    <${heading} id="${esc(itemDomId(item))}-stem" class="tp-stem">${esc(item.stem)}</${heading}>
    ${item.format === "grid-in" ? gridInView(item, state, locked, mode) : choicesView(item, state, locked, { eliminator, eliminated })}
    ${mode === "test" ? "" : feedbackView(item, state)}
    <div class="question-actions"><p>${instruction}</p>
      <div class="question-action-buttons">${buttons}</div></div>
  </form>`;
}
