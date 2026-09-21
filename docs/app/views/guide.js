import { escapeHtml as esc, link, breadcrumbs, contextCrumbs } from "../ui.js";
import { createConceptText, conceptHelp } from "../concepts/text.js";
import { readingSettingsPanel } from "../reading/preferences.js";
import { readingMarkControls } from "../reading/marks.js";
import { frameworkGuide, sourceLabel, writingInvite } from "./framework.js";
import { readingPath } from "../share/links.js";
import { reportButton, sharePanel } from "../share/views.js";

const promptText = (prompt) => (typeof prompt === "string" ? prompt : prompt.prompt);

function copySectionAction(route, sectionId, label = "section", reportContext = null) {
  return `<div class="reading-heading-actions"><button type="button" class="reading-section-action" data-reading-action="copy-section" data-reading-route="${esc(route)}" data-reading-section="${esc(sectionId)}" aria-label="Copy link to this ${esc(label)}">Copy link</button>${
    reportContext
      ? reportButton({
          ...reportContext,
          type: "reading-section",
          itemId: sectionId,
          title: label,
          path: readingPath(route, sectionId),
        })
      : ""
  }${readingMarkControls({ targetType: "section", targetId: sectionId, sectionId, label: `this ${label}` })}</div>`;
}

function networkComparison(networkData, sources = []) {
  const networks = networkData?.networks || [];
  if (networks.length !== 3) return "";
  const dimensions = [
    ["geography", "Geography"],
    ["transportEnvironment", "Transport / environment"],
    ["representativeGoods", "Representative goods"],
    ["commercialPractices", "Commercial practices"],
    ["stateInvolvement", "State involvement"],
    ["tradingCities", "Trading cities"],
    ["culturalConsequences", "Cultural consequences"],
    ["environmentalConsequences", "Environmental consequences"],
  ];
  return `<div class="table-wrap comparison-table" role="region" tabindex="0" aria-label="Three-network comparison"><table><caption>Canonical Unit 2 network comparison</caption><thead><tr><th scope="col">Dimension</th>${networks.map((network) => `<th scope="col">${esc(network.label)}</th>`).join("")}</tr></thead><tbody>${dimensions.map(([id, label]) => `<tr><th scope="row">${label}</th>${networks.map((network) => `<td>${esc(network.dimensions[id])}<small>Source: ${esc(network.sourceIds.map((sourceId) => sourceLabel(sources, sourceId)).join(", "))}</small></td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function explorer(networkData, route, reportContext) {
  if (!networkData) return "";
  const {
    networks = [],
    places = [],
    connections = [],
    seasonalExamples = [],
    saharaPlans = [],
  } = networkData;
  const longitudes = places.map((place) => place.coordinates?.longitude ?? 0);
  const latitudes = places.map((place) => place.coordinates?.latitude ?? 0);
  const minLongitude = Math.min(...longitudes, -10);
  const maxLongitude = Math.max(...longitudes, 120);
  const minLatitude = Math.min(...latitudes, -10);
  const maxLatitude = Math.max(...latitudes, 42);
  const positions = Object.fromEntries(
    places.map((place) => [
      place.id,
      {
        x:
          22 +
          (((place.coordinates?.longitude ?? 0) - minLongitude) /
            (maxLongitude - minLongitude)) *
            516,
        y:
          188 -
          (((place.coordinates?.latitude ?? 0) - minLatitude) /
            (maxLatitude - minLatitude)) *
            166,
      },
    ]),
  );
  const lineSvg = connections
    .map(([a, b]) => {
      const networkIds = [
        ...new Set([
          ...(places.find((place) => place.id === a)?.networks || []),
          ...(places.find((place) => place.id === b)?.networks || []),
        ]),
      ].join(",");
      return `<line data-connection-networks="${esc(networkIds)}" x1="${positions[a].x}" y1="${positions[a].y}" x2="${positions[b].x}" y2="${positions[b].y}" />`;
    })
    .join("");
  const nodeSvg = places
    .map(
      (place) =>
        `<g data-place-networks="${esc(place.networks.join(","))}"><circle cx="${positions[place.id].x}" cy="${positions[place.id].y}" r="8" /><text x="${positions[place.id].x + 12}" y="${positions[place.id].y + 4}">${esc(place.name)}</text></g>`,
    )
    .join("");
  const first = places[0];
  return `<section id="networks" data-reading-section="networks" class="guide-surface network-explorer" data-unit-tool="network" aria-labelledby="network-title"><p class="eyebrow">MAPS &amp; CONNECTIONS</p><div class="reading-section-heading"><h2 id="network-title">Explore the exchange networks.</h2>${copySectionAction(route, "networks", "section", reportContext)}</div><p>Routes are schematic selected connections, not exhaustive itineraries or medieval political borders. Use the synchronized place list as the complete text equivalent.</p>
    <fieldset class="network-layers"><legend>Show network layers</legend>${networks.map((network) => `<label><input type="checkbox" data-network-toggle="${esc(network.id)}" checked>${esc(network.label)}</label>`).join("")}</fieldset>
    <div class="network-map-wrap"><svg class="network-map" viewBox="0 0 560 210" role="img" aria-label="Schematic geographic orientation of selected Unit 2 network connections"><rect x="0" y="0" width="560" height="210" rx="12" /><g class="network-routes">${lineSvg}</g><g class="network-nodes">${nodeSvg}</g></svg><p class="muted">${esc(networkData.mapSource?.label || "Approximate modern coordinates")}. The lines are selected connections, not exhaustive or unchanging route itineraries.</p></div>
    <div class="network-place-grid"><div><h3>Places and relationships</h3><div class="network-place-list">${places.map((place) => `<button type="button" class="network-place" data-place-id="${esc(place.id)}" data-place-networks="${esc(place.networks.join(","))}"><strong>${esc(place.name)}</strong><span>${esc(place.region)} · ${esc(place.networks.map((id) => networks.find((network) => network.id === id)?.label || id).join(" / "))}</span></button>`).join("")}</div></div><article class="network-place-detail" id="network-place-detail" aria-live="polite"><p class="eyebrow">SELECT A PLACE</p><h3>${esc(first.name)}</h3><p>${esc(first.role)}</p><p><strong>Representative exchanges:</strong> ${esc(first.exchanges)}</p>${link(`/topic/${first.topicId}?section=${first.sectionId}`, "Review the lesson", "text-link")}</article></div>
    <div class="network-controls"><article><h3>Seasonal planning</h3><p>Choose a seasonal example and compare outward and return planning.</p><label for="seasonal-example">Example</label><select id="seasonal-example" data-seasonal-example>${seasonalExamples.map((example) => `<option value="${esc(example.id)}">${esc(example.label)}</option>`).join("")}</select><button type="button" class="btn secondary" data-seasonal-action>Show planning feedback</button><p id="seasonal-feedback" class="note" role="status">Select the feedback after choosing a route.</p></article><article><h3>Sahara logistics</h3><p>Choose a plausible plan and inspect what it notices or misses.</p><div class="sahara-plan-list">${saharaPlans.map((plan) => `<label><input type="radio" name="sahara-plan" value="${esc(plan.id)}" data-sahara-plan>${esc(plan.label)}</label>`).join("")}</div><button type="button" class="btn secondary" data-sahara-action>Check the plan</button><p id="sahara-feedback" class="note" role="status">Choose a plan to see the sourced reasoning.</p></article></div>
  </section>`;
}

function comparisonWorkspace(networkData, route, reportContext) {
  if (!networkData?.networks?.length) return "";
  const networks = networkData.networks;
  const options = networks
    .map((network) => `<option value="${esc(network.id)}">${esc(network.label)}</option>`)
    .join("");
  return `<section id="comparison-workspace" data-reading-section="comparison-workspace" class="guide-surface comparison-workspace" data-unit-tool="comparison" aria-labelledby="comparison-title"><p class="eyebrow">COMPARISON WORKSPACE</p><div class="reading-section-heading"><h2 id="comparison-title">Compare two networks by one dimension.</h2>${copySectionAction(route, "comparison-workspace", "section", reportContext)}</div><div class="comparison-controls"><label>First network<select data-compare-a>${options}</label><label>Second network<select data-compare-b>${networks
    .slice(1)
    .map((network) => `<option value="${esc(network.id)}">${esc(network.label)}</option>`)
    .join(
      "",
    )}</select></label><label>Dimension<select data-compare-dimension><option value="geography">Geography</option><option value="transportEnvironment">Transport / environment</option><option value="representativeGoods">Representative goods</option><option value="commercialPractices">Commercial practices</option><option value="stateInvolvement">State involvement</option><option value="tradingCities">Trading cities</option><option value="culturalConsequences">Cultural consequences</option><option value="environmentalConsequences">Environmental consequences</option></select></label></div><div class="pairwise-comparison" data-compare-output role="region" aria-live="polite"></div>${networkData.comparisonPrompts?.map((prompt) => `<details class="comparison-prompt"><summary>${esc(prompt.prompt)}</summary><p>${esc(prompt.model)}</p><label for="${esc(prompt.id)}">Your claim and evidence</label><textarea id="${esc(prompt.id)}" rows="4" placeholder="Make a claim, then use evidence from both networks."></textarea></details>`).join("") || ""}</section>`;
}

function claimActivities(activities = [], route, reportContext) {
  if (!activities.length) return "";
  return `<section id="claim-activities" data-reading-section="claim-activities" class="guide-surface claim-activities" data-unit-tool="activities" aria-labelledby="claim-title"><p class="eyebrow">EVIDENCE / CLAIM PRACTICE</p><div class="reading-section-heading"><h2 id="claim-title">Choose the evidence that actually supports the claim.</h2>${copySectionAction(route, "claim-activities", "section", reportContext)}</div>${activities.map((activity) => `<article class="claim-task"><h3>${esc(activity.title)}</h3><p>${esc(activity.claim)}</p><fieldset><legend class="visually-hidden">Evidence choices</legend>${activity.options.map((option) => `<label><input type="radio" name="${esc(activity.id)}" value="${esc(option.id)}" data-activity-id="${esc(activity.id)}" data-activity-correct="${option.correct}">${esc(option.text)}</label>`).join("")}</fieldset><p class="note" data-activity-feedback="${esc(activity.id)}" role="status">Choose an option to see why it fits or falls short.</p>${link(`/topic/${activity.review.topicId}?section=${activity.review.sectionId}`, `Review ${esc(activity.review.label)}`, "text-link")}</article>`).join("")}</section>`;
}

export function studyGuidePage(data) {
  const { unit, guide, topics, sources, framework } = data;
  const offlineReading = data.offlineReading === true;
  const route = `/guide/${unit.id}`;
  const reportContext = {
    courseId: data.course?.id || unit.courseId,
    topicId: "",
    revision: data.contentRevision || "",
    route,
  };
  const definitionTrigger = data.readingPreferences?.definitionTrigger || "hover-focus";
  const reading = createConceptText(data.glossary, { triggerMode: definitionTrigger });
  const navItems = [
    ...(guide.overview ? [["overview", "Overview"]] : []),
    ["timeline", "Timeline"],
    ["comparison", "Comparison"],
    ...(guide.networkData
      ? [
          ["networks", "Network explorer"],
          ["comparison-workspace", "Comparison workspace"],
        ]
      : []),
    ...(guide.activities?.length ? [["claim-activities", "Claim practice"]] : []),
    ...(guide.causalChains ? [["causal-chains", "Causal chains"]] : []),
    ...(guide.evidenceGuide ? [["evidence-guide", "Evidence bank"]] : []),
    ["topic-check", "Topic check"],
    ["pitfalls", "Precise claims"],
    ...(guide.unit1Bridge ? [["unit1-bridge", "Unit 1 bridge"]] : []),
    ...(guide.laterCallout ? [["later-callout", "Looking ahead"]] : []),
    ["resources", "Resources"],
  ];
  const navLink = (id, label) =>
    `<a href="#${route}?section=${esc(id)}" data-reading-nav-link="${esc(id)}">${esc(label)}</a>`;
  const activityLinks = offlineReading
    ? '<p class="practice-unavailable" role="status">Quizzes and writing practice are available online when you reconnect.</p>'
    : `${unit.quizzes.map((quiz) => link(`/quiz/${quiz.id}`, esc(quiz.title), "btn")).join(" ")} ${unit.writingQuizzes
        .slice(0, 3)
        .map((quiz) => link(`/writing/${quiz.id}`, esc(quiz.title), "btn secondary"))
        .join(" ")}`;
  return `<div class="container study-guide reading-surface" data-reading-route="${esc(route)}" data-reading-revision="${esc(data.contentRevision || "")}">${breadcrumbs(contextCrumbs(data, "Study guide"))}
    <nav class="reading-guide-nav" aria-label="Study guide sections"><details class="reading-nav-disclosure" open><summary>On this page</summary><div class="reading-nav-links">${navItems.map(([id, label]) => navLink(id, label)).join("")}</div></details><details class="reading-settings-disclosure"><summary>Reading settings</summary>${readingSettingsPanel(data.readingPreferences, { compact: true })}</details><p id="reading-position-status" class="muted" role="status" aria-live="polite"></p></nav>
    <header class="page-intro"><p class="eyebrow">UNIT ${unit.number} / ${esc(unit.period)}</p>
      <h1>${esc(guide.headline)}</h1><p>${reading(guide.essential)}</p>${conceptHelp(data.glossary, definitionTrigger)}
      <div class="actions">${activityLinks}</div>${sharePanel({ path: route, title: guide.headline, label: "Share this study guide. It opens without private work." })}
    </header>
    ${guide.overview ? `<section id="overview" data-reading-section="overview" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Unit overview</h2>${copySectionAction(route, "overview", "section", reportContext)}</div><p>${reading(guide.overview)}</p></section>` : ""}
    <section id="timeline" data-reading-section="timeline" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Start with the timeline.</h2>${copySectionAction(route, "timeline", "section", reportContext)}</div><dl class="guide-timeline">${guide.timeline.map((item) => `<div><dt>${esc(item.date)}</dt><dd>${reading(item.text)}</dd></div>`).join("")}</dl></section>
    <section id="comparison" data-reading-section="comparison" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Compare the same feature.</h2>${copySectionAction(route, "comparison", "section", reportContext)}</div><p>These cells come from the same canonical network records used by the explorer and comparison workspace.</p>${networkComparison(guide.networkData, sources)}${frameworkGuide(framework)}</section>
    ${offlineReading ? '<section class="practice-unavailable" role="status"><p>Interactive network tools and claim practice are available online when you reconnect.</p></section>' : explorer(guide.networkData, route, reportContext)}
    ${offlineReading ? "" : comparisonWorkspace(guide.networkData, route, reportContext)}
    ${offlineReading ? "" : claimActivities(guide.activities, route, reportContext)}
    ${guide.causalChains ? `<section id="causal-chains" data-reading-section="causal-chains" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Follow the causal chains.</h2>${copySectionAction(route, "causal-chains", "section", reportContext)}</div><div class="causal-chain-list">${guide.causalChains.map((chain) => `<article><h3>${esc(chain.title)}</h3><ol>${chain.steps.map((step) => `<li>${reading(step)}</li>`).join("")}</ol></article>`).join("")}</div></section>` : ""}
    ${guide.evidenceGuide ? `<section id="evidence-guide" data-reading-section="evidence-guide" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Build an evidence bank.</h2>${copySectionAction(route, "evidence-guide", "section", reportContext)}</div><div class="evidence-guide">${guide.evidenceGuide.map((item) => `<article><p class="eyebrow">${esc(item.whereWhen)}</p><h3>${esc(item.claim)}</h3><p><strong>Limit:</strong> ${esc(item.limitation)}</p><p class="muted">Sources: ${esc(item.sourceIds.map((sourceId) => sourceLabel(sources, sourceId)).join(", "))}</p>${link(`/topic/${item.review.topicId}?section=${item.review.sectionId}`, `Review ${esc(item.review.label)}`, "text-link")}</article>`).join("")}</div></section>` : ""}
    <section id="topic-check" data-reading-section="topic-check" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Check your understanding.</h2>${copySectionAction(route, "topic-check", "section", reportContext)}</div><div class="guide-topic-list">${topics.map((topic) => `<article><p class="eyebrow">TOPIC ${esc(topic.code)}${topic.readingGuide?.objectives ? ` / OBJECTIVES ${esc(topic.readingGuide.objectives)}` : ""}</p><h3>${link(`/topic/${topic.id}`, esc(topic.title))}</h3><p>${reading(topic.bigIdea)}</p><ul>${(topic.readingGuide?.prompts || []).map((prompt) => `<li>${reading(promptText(prompt))}</li>`).join("")}</ul>${link(`/topic/${topic.id}${topic.readingGuide ? "?section=reading-guide" : ""}`, "Open lesson and reading guide", "text-link")}</article>`).join("")}</div></section>
    <section id="pitfalls" data-reading-section="pitfalls" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Keep your claims precise.</h2>${copySectionAction(route, "pitfalls", "section", reportContext)}</div><ul class="guide-pitfalls">${guide.pitfalls.map((text) => `<li>${reading(text)}</li>`).join("")}</ul></section>
    ${guide.unit1Bridge ? `<section id="unit1-bridge" data-reading-section="unit1-bridge" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Bridge from Unit 1.</h2>${copySectionAction(route, "unit1-bridge", "section", reportContext)}</div><p>${reading(guide.unit1Bridge)}</p></section>` : ""}
    ${guide.laterCallout ? `<section id="later-callout" data-reading-section="later-callout" class="guide-surface reading-copy"><div class="reading-section-heading"><h2>Looking ahead.</h2>${copySectionAction(route, "later-callout", "section", reportContext)}</div><p>${reading(guide.laterCallout)}</p></section>` : ""}
    ${writingInvite(unit, { offlineReading })}
    <section id="resources" data-reading-section="resources" class="guide-surface resource-section reading-copy"><div class="reading-section-heading"><h2>Read and watch further.</h2>${copySectionAction(route, "resources", "section", reportContext)}</div><p>Course readings anchor the notes. These resources offer further context and review. Linked videos are optional.</p><div class="resource-list">${sources.map((source) => `<article>${source.url ? `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a>` : `<strong>${esc(source.label)}</strong>`}<p>${esc(source.note || "")}</p></article>`).join("")}</div><p class="muted">All Page One questions and study explanations are original. Source PDFs and commercial question banks are not reproduced.</p></section>
  </div>`;
}
