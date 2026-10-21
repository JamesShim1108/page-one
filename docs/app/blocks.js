import { escapeHtml as esc } from "./ui.js";
import { readingMarkControls } from "./reading/marks.js";
import { readingPath } from "./share/links.js";
import { reportButton } from "./share/views.js";
import { icon } from "./icons.js";
import { renderGraph } from "./graph/render.js";

export function stableBlockId(block, sectionId, index) {
  return block?.id || `${sectionId}-block-${index + 1}`;
}

function blockExcerpt(block) {
  if (!block || typeof block !== "object") return "";
  if (block.type === "paragraph" || block.type === "callout") return block.text || "";
  if (block.type === "source")
    return block.text || block.description || block.caption || "";
  if (block.type === "list") return (block.items || []).join(" ");
  if (block.type === "graph") return block.caption || "";
  return "";
}

const SOURCE_LABELS = {
  primary: "Primary source",
  secondary: "Secondary source",
  original: "Practice passage · Written by Page One",
};

// Mirrors how AP exams introduce a source: who, what, and when above the text,
// with the published edition below it. A source can also be an image (cartoon,
// poster, photograph, map) or a data table, as on the AP U.S. History exam.
export function renderSource(block, renderText = esc, assets = {}) {
  const kind = SOURCE_LABELS[block.sourceType] || "Source";
  const medium = block.medium || "text";
  let body;
  if (medium === "image") body = sourceImage(block, assets[block.assetId]);
  else if (medium === "table") body = renderTable(block, renderText);
  else
    body = `<blockquote>${String(block.text || "")
      .split(/\n{2,}/)
      .map((paragraph) => `<p>${renderText(paragraph)}</p>`)
      .join("")}</blockquote>`;
  return `<figure class="source-excerpt source-excerpt--${esc(block.sourceType || "primary")}${medium === "text" ? "" : ` source-excerpt--${esc(medium)}`}">
    <figcaption><span class="source-kind">${esc(kind)}</span><span class="source-attribution">${esc(block.attribution)}</span></figcaption>
    ${body}
    ${block.citation ? `<p class="source-citation">${esc(block.citation)}</p>` : ""}
    ${block.note ? `<p class="source-note">${esc(block.note)}</p>` : ""}
  </figure>`;
}

// The image fills the source frame; its written description stays one tap
// away, and the credit comes from the asset manifest.
function sourceImage(block, asset) {
  if (!asset)
    return `<p class="source-description">${esc(block.description || block.alt || "Image unavailable.")}</p>`;
  const { src, srcset } = imageSources(asset);
  return `<a class="source-image" href="${esc(src)}" target="_blank" rel="noopener noreferrer" title="Open full-size image">
      <img src="${esc(src)}" srcset="${esc(srcset)}" sizes="(max-width: 700px) calc(100vw - 88px), 650px"
        width="${asset.width}" height="${asset.height}" alt="${esc(block.alt)}" loading="lazy" decoding="async">
    </a>
    <details class="source-description"><summary>Image description</summary><p>${esc(block.description)}</p></details>
    <p class="source-credit"><a href="${esc(asset.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(asset.creator)}</a> / ${asset.licenseUrl ? `<a href="${esc(asset.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(asset.license)}</a>` : esc(asset.license)}</p>`;
}

function readingAnchor(block, html, sectionId, index, reportContext = null) {
  if (!sectionId) return html;
  const stableId = stableBlockId(block, sectionId, index);
  const id = esc(stableId);
  return `<div class="reading-block" id="${id}" data-reading-block="${id}" data-reading-section="${esc(sectionId)}">
    ${html}
    <div class="reading-block-actions">
      <button type="button" class="reading-block-action reading-block-action--icon" data-reading-action="copy-section" data-reading-section="${esc(sectionId)}" data-reading-block="${id}" title="Copy block link">${icon("link")}<span class="visually-hidden">Copy block link</span></button>
      ${readingMarkControls({
        targetType: "block",
        targetId: stableBlockId(block, sectionId, index),
        sectionId,
        excerpt: blockExcerpt(block),
        label: "this passage",
      })}
      ${
        reportContext
          ? reportButton({
              type: "reading-block",
              courseId: reportContext.courseId,
              topicId: reportContext.topicId,
              itemId: stableId,
              title: blockExcerpt(block) || stableId,
              revision: reportContext.revision,
              path: readingPath(reportContext.route, sectionId, stableId),
              label: "Report an issue",
              iconOnly: true,
            })
          : ""
      }
    </div>
  </div>`;
}

export function renderBlocks(
  blocks,
  assets = {},
  renderText = esc,
  sectionId = "",
  reportContext = null,
  { interactiveGraphs = true } = {},
) {
  return blocks
    .map((block, index) => {
      let html;
      switch (block.type) {
        case "paragraph":
          html = `<p>${renderText(block.text)}</p>`;
          break;
        case "callout":
          html = `<aside class="note"><strong>${esc(block.title)}</strong> ${renderText(block.text)}</aside>`;
          break;
        case "list": {
          const tag = block.ordered ? "ol" : "ul";
          html = `<${tag}>${block.items.map((item) => `<li>${renderText(item)}</li>`).join("")}</${tag}>`;
          break;
        }
        case "table":
          html = renderTable(block, renderText);
          break;
        case "image":
          html = renderImage(block, assets[block.assetId]);
          break;
        case "source":
          html = renderSource(block, renderText, assets);
          break;
        case "graph":
          html = renderGraph(block, { interactive: interactiveGraphs });
          break;
        default:
          throw new Error(`Unsupported content block: ${block.type}`);
      }
      return readingAnchor(block, html, sectionId, index, reportContext);
    })
    .join("\n");
}

export function renderTable({ caption, columns, rows }, renderText = esc) {
  return `<div class="table-wrap" role="region" tabindex="0" aria-label="${esc(caption)}">
    <table><caption>${esc(caption)}</caption>
      <thead><tr>${columns.map((column) => `<th scope="col">${esc(column)}</th>`).join("")}</tr></thead>
      <tbody>${rows
        .map(
          (row) =>
            `<tr><th scope="row">${renderText(row[0])}</th>${row
              .slice(1)
              .map((cell) => `<td>${renderText(cell)}</td>`)
              .join("")}</tr>`,
        )
        .join("")}</tbody>
    </table>
  </div>`;
}

function assetUrl(path) {
  // Base this on the module, so /page-one/ and a future custom domain both work.
  return new URL(`../${path}`, import.meta.url).href;
}

function imageSources(asset) {
  const src = assetUrl(asset.file);
  const variants = [...(asset.variants || []), { file: asset.file, width: asset.width }];
  const unique = [
    ...new Map(variants.map((variant) => [variant.width, variant])).values(),
  ].sort((a, b) => a.width - b.width);
  const srcset = unique
    .map((variant) => `${assetUrl(variant.file)} ${variant.width}w`)
    .join(", ");
  return { src, srcset };
}

export function renderImage(block, asset) {
  if (!asset) throw new Error(`Missing image: ${block.assetId}`);
  const { src, srcset } = imageSources(asset);
  return `<figure class="lesson-figure">
    <a class="lesson-figure__enlarge" href="${esc(src)}" target="_blank" rel="noopener noreferrer" aria-label="Open full-size image: ${esc(asset.title)}" title="Open full-size image">
      <img src="${esc(src)}" srcset="${esc(srcset)}" sizes="(max-width: 700px) calc(100vw - 88px), 650px"
        width="${asset.width}" height="${asset.height}" alt="${esc(block.alt)}" loading="lazy" decoding="async">
    </a>
    <figcaption>${esc(block.caption)}
      <small><a href="${esc(asset.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(asset.creator)}</a>
      / ${asset.licenseUrl ? `<a href="${esc(asset.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(asset.license)}</a>` : esc(asset.license)}</small>
    </figcaption>
  </figure>`;
}
