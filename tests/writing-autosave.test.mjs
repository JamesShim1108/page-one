import test from "node:test";
import assert from "node:assert/strict";
import { createWritingAutosave } from "../docs/app/writing/autosave.js";

function fakeClock() {
  let now = 0;
  let nextId = 1;
  const timers = new Map();
  return {
    setTimeout(fn, delay) {
      const id = nextId++;
      timers.set(id, { at: now + delay, fn });
      return id;
    },
    clearTimeout(id) {
      timers.delete(id);
    },
    tick(duration) {
      const target = now + duration;
      while (true) {
        const next = [...timers.entries()]
          .filter(([, timer]) => timer.at <= target)
          .sort(([, first], [, second]) => first.at - second.at)[0];
        if (!next) break;
        const [id, timer] = next;
        timers.delete(id);
        now = timer.at;
        timer.fn();
      }
      now = target;
    },
  };
}

test("writing autosave waits for quiet input and never exceeds its maximum interval", async () => {
  const clock = fakeClock();
  let saves = 0;
  const autosave = createWritingAutosave({
    save: () => {
      saves += 1;
      return { ok: true, status: "saved" };
    },
    setTimeoutFn: clock.setTimeout,
    clearTimeoutFn: clock.clearTimeout,
  });

  autosave.markDirty();
  clock.tick(499);
  assert.equal(saves, 0);
  clock.tick(1);
  await Promise.resolve();
  assert.equal(saves, 1);

  for (let index = 0; index < 4; index += 1) {
    autosave.markDirty();
    clock.tick(400);
  }
  assert.equal(saves, 1);
  clock.tick(401);
  await Promise.resolve();
  assert.equal(saves, 2);
});

test("a newer edit stays pending while a slower prior save completes", async () => {
  const clock = fakeClock();
  let resolveFirst;
  let saves = 0;
  const completions = [];
  const autosave = createWritingAutosave({
    save: () => {
      saves += 1;
      if (saves === 1)
        return new Promise((resolve) => {
          resolveFirst = resolve;
        });
      return Promise.resolve({ ok: true, status: "saved" });
    },
    onComplete: (_result, details) => completions.push(details),
    setTimeoutFn: clock.setTimeout,
    clearTimeoutFn: clock.clearTimeout,
  });

  autosave.markDirty();
  const first = autosave.flush();
  autosave.markDirty();
  const second = autosave.flush();
  assert.equal(saves, 2);
  await second;
  resolveFirst({ ok: true, status: "saved" });
  await first;
  assert.deepEqual(
    completions.map((details) => details.revision),
    [2],
  );
  assert.equal(completions[0].stale, false);
});
