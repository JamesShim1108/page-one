function fieldsForSnapshot(snapshot) {
  return snapshot?.responseFields || [];
}

function titleFor(snapshot, fallback = "Writing response") {
  return snapshot?.promptTitle || fallback;
}

export function formatWritingExport({
  title,
  promptSnapshot,
  responses = {},
  reviewed = false,
  scores = {},
  includePrompt = false,
  includeSelfReview = false,
}) {
  const lines = [title || titleFor(promptSnapshot)];
  if (includePrompt && promptSnapshot) {
    lines.push(
      "",
      "Prompt",
      promptSnapshot.promptTitle || "",
      promptSnapshot.prompt || "",
      promptSnapshot.instructions || "",
    );
  }
  lines.push("", "Responses");
  for (const field of fieldsForSnapshot(promptSnapshot)) {
    lines.push("", field.label || field.prompt || field.id, responses[field.id] || "");
  }
  if (includeSelfReview && reviewed && promptSnapshot?.rubric?.length) {
    lines.push("", "Self-review");
    for (const criterion of promptSnapshot.rubric) {
      const value = scores[criterion.id];
      lines.push(
        `${criterion.label || criterion.id}: ${value === null || value === undefined ? "not scored" : `${value} / ${criterion.points}`}`,
      );
    }
  }
  return `${lines.join("\n")}\n`;
}

export function writingFilename(title, date = new Date()) {
  const safeTitle = String(title || "writing-response")
    .replace(/[\\/:*?"<>|]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
    .slice(0, 80);
  const isoDate = date.toISOString().slice(0, 10);
  return `${safeTitle || "writing-response"}-${isoDate}.txt`;
}
