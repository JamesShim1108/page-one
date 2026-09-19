import { escapeHtml as esc, link, breadcrumbs, contextCrumbs } from "../ui.js";
import { createConceptText, conceptHelp } from "../concepts/text.js";
import { frameworkGuide, writingInvite } from "./framework.js";

const promptText = (prompt) => (typeof prompt === "string" ? prompt : prompt.prompt);

function networkComparison(networkData) {
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
  return `<div class="table-wrap comparison-table" role="region" tabindex="0" aria-label="Three-network comparison"><table><caption>Canonical Unit 2 network comparison</caption><thead><tr><th scope="col">Dimension</th>${networks.map((network) => `<th scope="col">${esc(network.label)}</th>`).join("")}</tr></thead><tbody>${dimensions.map(([id, label]) => `<tr><th scope="row">${label}</th>${networks.map((network) => `<td>${esc(network.dimensions[id])}<small>Source: ${esc(network.sourceIds.join(", "))}</small></td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function explorer(networkData) {
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
  return `<section id="networks" class="guide-surface network-explorer" data-unit-tool="network" aria-labelledby="network-title"><p class="eyebrow">MAPS &amp; CONNECTIONS</p><h2 id="network-title">Explore the exchange networks.</h2><p>Routes are schematic selected connections, not exhaustive itineraries or medieval political borders. Use the synchronized place list as the complete text equivalent.</p>
    <fieldset class="network-layers"><legend>Show network layers</legend>${networks.map((network) => `<label><input type="checkbox" data-network-toggle="${esc(network.id)}" checked>${esc(network.label)}</label>`).join("")}</fieldset>
    <div class="network-map-wrap"><svg class="network-map" viewBox="0 0 560 210" role="img" aria-label="Schematic geographic orientation of selected Unit 2 network connections"><rect x="0" y="0" width="560" height="210" rx="12" /><g class="network-routes">${lineSvg}</g><g class="network-nodes">${nodeSvg}</g></svg><p class="muted">${esc(networkData.mapSource?.label || "Approximate modern coordinates")}. The lines are selected connections, not exhaustive or unchanging route itineraries.</p></div>
    <div class="network-place-grid"><div><h3>Places and relationships</h3><div class="network-place-list">${places.map((place) => `<button type="button" class="network-place" data-place-id="${esc(place.id)}" data-place-networks="${esc(place.networks.join(","))}"><strong>${esc(place.name)}</strong><span>${esc(place.region)} · ${esc(place.networks.map((id) => networks.find((network) => network.id === id)?.label || id).join(" / "))}</span></button>`).join("")}</div></div><article class="network-place-detail" id="network-place-detail" aria-live="polite"><p class="eyebrow">SELECT A PLACE</p><h3>${esc(first.name)}</h3><p>${esc(first.role)}</p><p><strong>Representative exchanges:</strong> ${esc(first.exchanges)}</p>${link(`/topic/${first.topicId}?section=${first.sectionId}`, "Review the lesson", "text-link")}</article></div>
    <div class="network-controls"><article><h3>Seasonal planning</h3><p>Choose a seasonal example and compare outward and return planning.</p><label for="seasonal-example">Example</label><select id="seasonal-example" data-seasonal-example>${seasonalExamples.map((example) => `<option value="${esc(example.id)}">${esc(example.label)}</option>`).join("")}</select><button type="button" class="btn secondary" data-seasonal-action>Show planning feedback</button><p id="seasonal-feedback" class="note" role="status">Select the feedback after choosing a route.</p></article><article><h3>Sahara logistics</h3><p>Choose a plausible plan and inspect what it notices or misses.</p><div class="sahara-plan-list">${saharaPlans.map((plan) => `<label><input type="radio" name="sahara-plan" value="${esc(plan.id)}" data-sahara-plan>${esc(plan.label)}</label>`).join("")}</div><button type="button" class="btn secondary" data-sahara-action>Check the plan</button><p id="sahara-feedback" class="note" role="status">Choose a plan to see the sourced reasoning.</p></article></div>
  </section>`;
}

function comparisonWorkspace(networkData) {
  if (!networkData?.networks?.length) return "";
  const networks = networkData.networks;
  const options = networks
    .map((network) => `<option value="${esc(network.id)}">${esc(network.label)}</option>`)
    .join("");
  return `<section class="guide-surface comparison-workspace" data-unit-tool="comparison" aria-labelledby="comparison-title"><p class="eyebrow">COMPARISON WORKSPACE</p><h2 id="comparison-title">Compare two networks by one dimension.</h2><div class="comparison-controls"><label>First network<select data-compare-a>${options}</select></label><label>Second network<select data-compare-b>${networks
    .slice(1)
    .map((network) => `<option value="${esc(network.id)}">${esc(network.label)}</option>`)
    .join(
      "",
    )}</select></label><label>Dimension<select data-compare-dimension><option value="geography">Geography</option><option value="transportEnvironment">Transport / environment</option><option value="representativeGoods">Representative goods</option><option value="commercialPractices">Commercial practices</option><option value="stateInvolvement">State involvement</option><option value="tradingCities">Trading cities</option><option value="culturalConsequences">Cultural consequences</option><option value="environmentalConsequences">Environmental consequences</option></select></label></div><div class="pairwise-comparison" data-compare-output role="region" aria-live="polite"></div>${networkData.comparisonPrompts?.map((prompt) => `<details class="comparison-prompt"><summary>${esc(prompt.prompt)}</summary><p>${esc(prompt.model)}</p><label for="${esc(prompt.id)}">Your claim and evidence</label><textarea id="${esc(prompt.id)}" rows="4" placeholder="Make a claim, then use evidence from both networks."></textarea></details>`).join("") || ""}</section>`;
}

function claimActivities(activities = []) {
  if (!activities.length) return "";
  return `<section class="guide-surface claim-activities" data-unit-tool="activities" aria-labelledby="claim-title"><p class="eyebrow">EVIDENCE / CLAIM PRACTICE</p><h2 id="claim-title">Choose the evidence that actually supports the claim.</h2>${activities.map((activity) => `<article class="claim-task"><h3>${esc(activity.title)}</h3><p>${esc(activity.claim)}</p><fieldset><legend class="visually-hidden">Evidence choices</legend>${activity.options.map((option) => `<label><input type="radio" name="${esc(activity.id)}" value="${esc(option.id)}" data-activity-id="${esc(activity.id)}" data-activity-correct="${option.correct}">${esc(option.text)}</label>`).join("")}</fieldset><p class="note" data-activity-feedback="${esc(activity.id)}" role="status">Choose an option to see why it fits or falls short.</p>${link(`/topic/${activity.review.topicId}?section=${activity.review.sectionId}`, `Review ${esc(activity.review.label)}`, "text-link")}</article>`).join("")}</section>`;
}

export function studyGuidePage(data) {
  const { unit, guide, topics, sources, framework } = data;
  const reading = createConceptText(data.glossary);
  return `<div class="container study-guide">${breadcrumbs(contextCrumbs(data, "Study guide"))}
    <header class="page-intro"><p class="eyebrow">UNIT ${unit.number} / ${esc(unit.period)}</p>
      <h1>${esc(guide.headline)}</h1><p>${reading(guide.essential)}</p>${conceptHelp(data.glossary)}
      <div class="actions">${unit.quizzes.map((quiz) => link(`/quiz/${quiz.id}`, esc(quiz.title), "btn")).join("")} ${unit.writingQuizzes
        .slice(0, 3)
        .map((quiz) => link(`/writing/${quiz.id}`, esc(quiz.title), "btn secondary"))
        .join(" ")}</div>
    </header>
    ${guide.overview ? `<section class="guide-surface"><h2>Unit overview</h2><p>${reading(guide.overview)}</p></section>` : ""}
    <section class="guide-surface"><h2>Start with the timeline.</h2><dl class="guide-timeline">${guide.timeline.map((item) => `<div><dt>${esc(item.date)}</dt><dd>${reading(item.text)}</dd></div>`).join("")}</dl></section>
    <section class="guide-surface"><h2>Compare the same feature.</h2><p>These cells come from the same canonical network records used by the explorer and comparison workspace.</p>${networkComparison(guide.networkData)}${frameworkGuide(framework)}</section>
    ${explorer(guide.networkData)}
    ${comparisonWorkspace(guide.networkData)}
    ${claimActivities(guide.activities)}
    ${guide.causalChains ? `<section class="guide-surface"><h2>Follow the causal chains.</h2><div class="causal-chain-list">${guide.causalChains.map((chain) => `<article><h3>${esc(chain.title)}</h3><ol>${chain.steps.map((step) => `<li>${reading(step)}</li>`).join("")}</ol></article>`).join("")}</div></section>` : ""}
    ${guide.evidenceGuide ? `<section class="guide-surface"><h2>Build an evidence bank.</h2><div class="evidence-guide">${guide.evidenceGuide.map((item) => `<article><p class="eyebrow">${esc(item.whereWhen)}</p><h3>${esc(item.claim)}</h3><p><strong>Limit:</strong> ${esc(item.limitation)}</p><p class="muted">Sources: ${esc(item.sourceIds.join(", "))}</p>${link(`/topic/${item.review.topicId}?section=${item.review.sectionId}`, `Review ${esc(item.review.label)}`, "text-link")}</article>`).join("")}</div></section>` : ""}
    <section class="guide-surface"><h2>Check your understanding.</h2><div class="guide-topic-list">${topics.map((topic) => `<article><p class="eyebrow">TOPIC ${esc(topic.code)}${topic.readingGuide?.objectives ? ` / OBJECTIVES ${esc(topic.readingGuide.objectives)}` : ""}</p><h3>${link(`/topic/${topic.id}`, esc(topic.title))}</h3><p>${reading(topic.bigIdea)}</p><ul>${(topic.readingGuide?.prompts || []).map((prompt) => `<li>${reading(promptText(prompt))}</li>`).join("")}</ul>${link(`/topic/${topic.id}${topic.readingGuide ? "?section=reading-guide" : ""}`, "Open lesson and reading guide", "text-link")}</article>`).join("")}</div></section>
    <section class="guide-surface"><h2>Keep your claims precise.</h2><ul class="guide-pitfalls">${guide.pitfalls.map((text) => `<li>${reading(text)}</li>`).join("")}</ul></section>
    ${guide.unit1Bridge ? `<section class="guide-surface"><h2>Bridge from Unit 1.</h2><p>${reading(guide.unit1Bridge)}</p></section>` : ""}
    ${guide.laterCallout ? `<section class="guide-surface"><h2>Looking ahead.</h2><p>${reading(guide.laterCallout)}</p></section>` : ""}
    ${writingInvite(unit)}
    <section class="guide-surface resource-section"><h2>Read and watch further.</h2><p>Course readings anchor the notes. These resources offer further context and review. Linked videos are optional.</p><div class="resource-list">${sources.map((source) => `<article>${source.url ? `<a href="${esc(source.url)}" target="_blank" rel="noopener noreferrer">${esc(source.label)}</a>` : `<strong>${esc(source.label)}</strong>`}<p>${esc(source.note || "")}</p></article>`).join("")}</div><p class="muted">All Page One questions and study explanations are original. Source PDFs and commercial question banks are not reproduced.</p></section>
  </div>`;
}
