import test from "node:test";
import assert from "node:assert/strict";
import { cleanPublicPath, publicPath, publicUrl } from "../docs/app/share/links.js";
import { qrSvg, encodeQr } from "../docs/app/share/qr.js";
import { buildReport } from "../docs/app/share/report.js";
import { reportButton, sharePanel } from "../docs/app/share/views.js";
import { sourceLabel } from "../docs/app/views/framework.js";

test("public paths remove attempts, answers, notes, filters, and result state", () => {
  assert.equal(
    cleanPublicPath(
      "/results/world-quiz-1?attempt=private&filter=incorrect&topic=world-1-1&score=7",
    ),
    "/quiz/world-quiz-1",
  );
  assert.equal(
    cleanPublicPath(
      "/topic/world-1-1?section=learn&block=learn-block-2&return=%2Fresults%2Fprivate",
    ),
    "/topic/world-1-1?section=learn&block=learn-block-2",
  );
  assert.equal(
    cleanPublicPath(
      "/term-set/world-terms-a?unit=world-1&view=list&q=private&notes=1&row=card-1",
    ),
    "/term-set/world-terms-a?unit=world-1&view=list",
  );
  assert.equal(
    cleanPublicPath(
      "/session?course=world&topics=world-1-1%2Cworld-1-2&count=5&mode=test&unseen=1&attempt=private&view=quiz",
    ),
    "/session?course=world&topics=world-1-1%2Cworld-1-2&count=5&mode=test&unseen=1",
  );
});

test("public URLs preserve a deployment subpath", () => {
  assert.equal(
    publicUrl(publicPath("topic", { id: "world-1-1", section: "learn" }), {
      href: "https://study.example/page-one/index.html?private=1#/results/private",
    }),
    "https://study.example/page-one/index.html#/topic/world-1-1?section=learn",
  );
});

test("reports contain structured location context and no private work by default", () => {
  const report = buildReport(
    {
      type: "result-question",
      courseId: "world",
      topicId: "world-1-1",
      itemId: "question-1",
      title: "Question title",
      revision: "rev-2026-09",
      path: "/results/world-quiz-1?attempt=private&score=4",
    },
    { category: "possible-answer" },
  );
  assert.match(report, /Possible incorrect answer/);
  assert.match(report, /Content revision: rev-2026-09/);
  assert.match(report, /Public link: \/quiz\/world-quiz-1/);
  assert.doesNotMatch(
    report,
    /attempt=private|score=4|selected answer|notes|draft|history/,
  );
});

test("share and report controls escape labels while keeping public paths", () => {
  const share = sharePanel({
    path: "/quiz/world-quiz-1?attempt=private",
    title: "<Quiz>",
  });
  const report = reportButton({
    type: "question",
    itemId: "q-1",
    title: "<Question>",
    path: "/results/world-quiz-1?attempt=private",
  });
  assert.match(share, /data-share-path="\/quiz\/world-quiz-1"/);
  assert.match(share, /&lt;Quiz&gt;/);
  assert.match(report, /data-report-path="\/quiz\/world-quiz-1"/);
  assert.match(report, /&lt;Question&gt;/);
  assert.doesNotMatch(share, /attempt=private/);
  assert.doesNotMatch(report, /attempt=private/);
});

test("local QR generation is bounded and does not place the URL in a remote request", () => {
  const value = "https://study.example/page-one/#/topic/world-1-1?section=learn";
  const qr = encodeQr(value);
  assert.ok(qr);
  assert.ok(qr.version >= 1 && qr.version <= 10);
  assert.equal(qr.matrix.length, qr.size);
  assert.ok(qr.matrix.every((row) => row.every((module) => typeof module === "boolean")));
  const rendered = qrSvg(value, { title: "Lesson QR" });
  assert.equal(rendered.ok, true);
  assert.match(rendered.svg, /<svg/);
  assert.doesNotMatch(rendered.svg, /study\.example/);
  assert.equal(qrSvg(`${value.repeat(20)}`).ok, false);
});

test("source IDs resolve to authored human-readable labels when available", () => {
  assert.equal(
    sourceLabel([{ id: "source-a", label: "Course reading, chapter 1" }], "source-a"),
    "Course reading, chapter 1",
  );
  assert.equal(sourceLabel([], "source-a"), "source-a");
});
