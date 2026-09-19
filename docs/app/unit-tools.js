import { escapeHtml as esc } from "./ui.js";

function visibleForNetworks(element, active) {
  const ids = (element.dataset.placeNetworks || element.dataset.connectionNetworks || "")
    .split(",")
    .filter(Boolean);
  element.hidden = ids.length > 0 && !ids.some((id) => active.has(id));
}

export function mountUnitTools(root, guide) {
  const data = guide?.networkData;
  if (!data) return () => {};
  const listeners = [];
  const on = (element, event, handler) => {
    if (!element) return;
    element.addEventListener(event, handler);
    listeners.push(() => element.removeEventListener(event, handler));
  };
  const activeNetworks = () =>
    new Set(
      [...root.querySelectorAll("[data-network-toggle]:checked")].map(
        (input) => input.dataset.networkToggle,
      ),
    );
  const applyLayers = () => {
    const active = activeNetworks();
    root
      .querySelectorAll("[data-place-networks], [data-connection-networks]")
      .forEach((element) => visibleForNetworks(element, active));
  };
  root
    .querySelectorAll("[data-network-toggle]")
    .forEach((input) => on(input, "change", applyLayers));
  root.querySelectorAll("[data-place-id]").forEach((button) =>
    on(button, "click", () => {
      const place = data.places.find((item) => item.id === button.dataset.placeId);
      const detail = root.querySelector("#network-place-detail");
      if (!place || !detail) return;
      detail.innerHTML = `<p class="eyebrow">${esc(place.region)}</p><h3>${esc(place.name)}</h3><p>${esc(place.role)}</p><p><strong>Representative exchanges:</strong> ${esc(place.exchanges)}</p><a class="text-link" href="#/topic/${esc(place.topicId)}?section=${esc(place.sectionId)}">Review the lesson</a>`;
    }),
  );
  on(root.querySelector("[data-seasonal-action]"), "click", () => {
    const id = root.querySelector("[data-seasonal-example]")?.value;
    const example = data.seasonalExamples.find((item) => item.id === id);
    const output = root.querySelector("#seasonal-feedback");
    if (example && output)
      output.textContent = `${example.outwardSeason} ${example.returnSeason} ${example.feedback}`;
  });
  on(root.querySelector("[data-sahara-action]"), "click", () => {
    const id = root.querySelector("[data-sahara-plan]:checked")?.value;
    const plan = data.saharaPlans.find((item) => item.id === id);
    const output = root.querySelector("#sahara-feedback");
    if (plan && output) output.textContent = `${plan.choice} ${plan.feedback}`;
  });
  const updateComparison = () => {
    const first =
      data.networks.find(
        (network) => network.id === root.querySelector("[data-compare-a]")?.value,
      ) || data.networks[0];
    const second =
      data.networks.find(
        (network) => network.id === root.querySelector("[data-compare-b]")?.value,
      ) || data.networks[1];
    const dimension =
      root.querySelector("[data-compare-dimension]")?.value || "geography";
    const output = root.querySelector("[data-compare-output]");
    if (!first || !second || !output) return;
    output.innerHTML = `<div class="pairwise-cell"><h3>${esc(first.label)}</h3><p>${esc(first.dimensions[dimension])}</p><small>Source: ${esc(first.sourceIds.join(", "))}</small></div><div class="pairwise-cell"><h3>${esc(second.label)}</h3><p>${esc(second.dimensions[dimension])}</p><small>Source: ${esc(second.sourceIds.join(", "))}</small></div>`;
  };
  root
    .querySelectorAll("[data-compare-a], [data-compare-b], [data-compare-dimension]")
    .forEach((select) => on(select, "change", updateComparison));
  root.querySelectorAll("[data-activity-id]").forEach((input) =>
    on(input, "change", () => {
      const activity = guide.activities?.find(
        (item) => item.id === input.dataset.activityId,
      );
      const option = activity?.options.find((item) => item.id === input.value);
      const output = root.querySelector(
        `[data-activity-feedback="${CSS.escape(input.dataset.activityId)}"]`,
      );
      if (option && output) output.textContent = option.feedback;
    }),
  );
  applyLayers();
  updateComparison();
  return () => listeners.forEach((remove) => remove());
}
