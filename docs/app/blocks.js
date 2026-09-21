import { escapeHtml as esc } from "./ui.js";
import { readingMarkControls } from "./reading/marks.js";
import { readingPath } from "./share/links.js";
import { reportButton } from "./share/views.js";

export function stableBlockId(block, sectionId, index) {
  return block?.id || `${sectionId}-block-${index + 1}`;
}

function blockExcerpt(block) {
  if (!block || typeof block !== "object") return "";
  if (block.type === "paragraph" || block.type === "callout") return block.text || "";
  if (block.type === "list") return (block.items || []).join(" ");
  return "";
}

function readingAnchor(block, html, sectionId, index, reportContext = null) {
  if (!sectionId) return html;
  const stableId = stableBlockId(block, sectionId, index);
  const id = esc(stableId);
  return `<div class="reading-block" id="${id}" data-reading-block="${id}" data-reading-section="${esc(sectionId)}">
    ${html}
    <div class="reading-block-actions">
      <button type="button" class="reading-block-action" data-reading-action="copy-section" data-reading-section="${esc(sectionId)}" data-reading-block="${id}">Copy block link</button>
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

export function renderImage(block, asset) {
  if (!asset) throw new Error(`Missing image: ${block.assetId}`);
  const src = assetUrl(asset.file);
  const variants = [...(asset.variants || []), { file: asset.file, width: asset.width }];
  const unique = [
    ...new Map(variants.map((variant) => [variant.width, variant])).values(),
  ].sort((a, b) => a.width - b.width);
  const srcset = unique
    .map((variant) => `${assetUrl(variant.file)} ${variant.width}w`)
    .join(", ");
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
