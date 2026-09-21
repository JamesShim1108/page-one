import { escapeHtml as esc } from "../ui.js";

const ECC_CODEWORDS_PER_BLOCK_LOW = [7, 10, 15, 20, 26, 18, 20, 24, 30, 18];
const NUM_ERROR_CORRECTION_BLOCKS_LOW = [1, 1, 1, 1, 1, 2, 2, 2, 2, 4];
const ALIGNMENT_POSITIONS = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
];

function multiply(a, b) {
  let result = 0;
  for (let value = b; value; value >>>= 1) {
    if (value & 1) result ^= a;
    a <<= 1;
    if (a & 0x100) a ^= 0x11d;
  }
  return result;
}

function bytesFor(text) {
  if (typeof TextEncoder === "function") return [...new TextEncoder().encode(text)];
  return unescape(encodeURIComponent(text))
    .split("")
    .map((character) => character.charCodeAt(0));
}

function rawDataModules(version) {
  let result = (16 * version + 128) * version + 64;
  if (version >= 2) {
    const align = Math.floor(version / 7) + 2;
    result -= (25 * align - 10) * align - 55;
  }
  if (version >= 7) result -= 36;
  return result;
}

function appendBits(bits, value, length) {
  for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
}

function dataCodewords(bytes, version) {
  const total = Math.floor(rawDataModules(version) / 8);
  const blocks = NUM_ERROR_CORRECTION_BLOCKS_LOW[version - 1];
  const eccLength = ECC_CODEWORDS_PER_BLOCK_LOW[version - 1];
  const capacity = total - blocks * eccLength;
  const bits = [];
  appendBits(bits, 0b0100, 4);
  appendBits(bits, bytes.length, version < 10 ? 8 : 16);
  for (const byte of bytes) appendBits(bits, byte, 8);
  if (bits.length > capacity * 8) return null;
  appendBits(bits, 0, Math.min(4, capacity * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const words = [];
  for (let i = 0; i < bits.length; i += 8)
    words.push(bits.slice(i, i + 8).reduce((value, bit) => (value << 1) | bit, 0));
  for (let pad = 0xec; words.length < capacity; pad ^= 0xec ^ 0x11) words.push(pad);
  return words;
}

function divisor(degree) {
  const result = [1];
  let root = 1;
  for (let i = 0; i < degree; i++) {
    const next = Array(result.length + 1).fill(0);
    for (let j = 0; j < result.length; j++) {
      next[j] ^= result[j];
      next[j + 1] ^= multiply(result[j], root);
    }
    result.splice(0, result.length, ...next);
    root = multiply(root, 2);
  }
  return result;
}

function remainder(data, divisorWords) {
  const result = Array(divisorWords.length - 1).fill(0);
  for (const byte of data) {
    const factor = byte ^ result[0];
    result.shift();
    result.push(0);
    for (let i = 0; i < result.length; i++)
      result[i] ^= multiply(divisorWords[i + 1], factor);
  }
  return result;
}

function interleave(data, version) {
  const raw = Math.floor(rawDataModules(version) / 8);
  const blocks = NUM_ERROR_CORRECTION_BLOCKS_LOW[version - 1];
  const eccLength = ECC_CODEWORDS_PER_BLOCK_LOW[version - 1];
  const shortLength = Math.floor(raw / blocks);
  const shortBlocks = blocks - (raw % blocks);
  const divisorWords = divisor(eccLength);
  const dataBlocks = [];
  const eccBlocks = [];
  let offset = 0;
  for (let i = 0; i < blocks; i++) {
    const length = shortLength - eccLength + (i >= shortBlocks ? 1 : 0);
    const block = data.slice(offset, offset + length);
    offset += length;
    dataBlocks.push(block);
    eccBlocks.push(remainder(block, divisorWords));
  }
  const result = [];
  for (let i = 0; i < shortLength; i++)
    for (const block of dataBlocks) if (i < block.length) result.push(block[i]);
  for (let i = 0; i < eccLength; i++)
    for (const block of eccBlocks) result.push(block[i]);
  return result;
}

function getBit(value, index) {
  return ((value >>> index) & 1) !== 0;
}

function makeMatrix(version, codewords, mask) {
  const size = version * 4 + 17;
  const modules = Array.from({ length: size }, () => Array(size).fill(false));
  const functions = Array.from({ length: size }, () => Array(size).fill(false));
  const setFunction = (x, y, dark) => {
    if (x >= 0 && y >= 0 && x < size && y < size) {
      modules[y][x] = Boolean(dark);
      functions[y][x] = true;
    }
  };
  const finder = (cx, cy) => {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const distance = Math.max(Math.abs(dx), Math.abs(dy));
        setFunction(cx + dx, cy + dy, distance !== 2 && distance !== 4);
      }
    }
  };
  finder(3, 3);
  finder(size - 4, 3);
  finder(3, size - 4);
  for (let i = 0; i < size; i++) {
    if (!functions[6][i]) setFunction(i, 6, i % 2 === 0);
    if (!functions[i][6]) setFunction(6, i, i % 2 === 0);
  }
  const positions = ALIGNMENT_POSITIONS[version - 2] || [];
  for (const y of positions)
    for (const x of positions)
      if (!functions[y][x])
        for (let dy = -2; dy <= 2; dy++)
          for (let dx = -2; dx <= 2; dx++)
            setFunction(x + dx, y + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
  for (let i = 0; i < 15; i++) {
    if (i < 6) setFunction(8, i, false);
    else if (i < 8) setFunction(8, i + 1, false);
    else setFunction(8, size - 15 + i, false);
    if (i < 8) setFunction(size - i - 1, 8, false);
    else setFunction(size - 15 + i, 8, false);
  }
  setFunction(8, size - 8, true);
  if (version >= 7) {
    let rem = version;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const bits = (version << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const bit = getBit(bits, i);
      setFunction(Math.floor(i / 3), (i % 3) + size - 8 - 3, bit);
      setFunction((i % 3) + size - 8 - 3, Math.floor(i / 3), bit);
    }
  }
  let bitIndex = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        if (functions[y][x]) continue;
        modules[y][x] =
          bitIndex < codewords.length * 8 &&
          getBit(codewords[bitIndex >>> 3], 7 - (bitIndex & 7));
        bitIndex++;
      }
    }
  }
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (
        !functions[y][x] &&
        [
          (x + y) % 2 === 0,
          y % 2 === 0,
          x % 3 === 0,
          (x + y) % 3 === 0,
          (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0,
          ((x * y) % 2) + ((x * y) % 3) === 0,
          (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
          (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
        ][mask]
      )
        modules[y][x] = !modules[y][x];
  const formatData = (1 << 3) | mask;
  let formatRem = formatData;
  for (let i = 0; i < 10; i++) formatRem = (formatRem << 1) ^ ((formatRem >>> 9) * 0x537);
  const formatBits = ((formatData << 10) | formatRem) ^ 0x5412;
  for (let i = 0; i < 15; i++) {
    const bit = getBit(formatBits, i);
    if (i < 6) modules[i][8] = bit;
    else if (i < 8) modules[i + 1][8] = bit;
    else modules[size - 15 + i][8] = bit;
    if (i < 8) modules[8][size - i - 1] = bit;
    else modules[8][size - 15 + i] = bit;
  }
  modules[size - 8][8] = true;
  return modules;
}

function penalty(matrix) {
  const size = matrix.length;
  let score = 0;
  const linePenalty = (line) => {
    let runColor = line[0];
    let runLength = 1;
    for (let i = 1; i < line.length; i++) {
      if (line[i] === runColor) runLength++;
      else {
        if (runLength >= 5) score += runLength - 2;
        runColor = line[i];
        runLength = 1;
      }
    }
    if (runLength >= 5) score += runLength - 2;
  };
  for (let y = 0; y < size; y++) linePenalty(matrix[y]);
  for (let x = 0; x < size; x++) linePenalty(matrix.map((row) => row[x]));
  for (let y = 0; y < size - 1; y++)
    for (let x = 0; x < size - 1; x++) {
      const value = matrix[y][x];
      if (
        value === matrix[y + 1][x] &&
        value === matrix[y][x + 1] &&
        value === matrix[y + 1][x + 1]
      )
        score += 3;
    }
  const pattern = [true, false, true, true, true, false, true];
  const matches = (line, start) =>
    pattern.every((value, index) => line[start + index] === value);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x <= size - 7; x++) {
      const line = matrix[y];
      if (matches(line, x) && (x < 4 || line.slice(x - 4, x).every((value) => !value)))
        score += 40;
      if (
        matches(line, x) &&
        (x + 11 > size || line.slice(x + 7, x + 11).every((value) => !value))
      )
        score += 40;
    }
  }
  for (let x = 0; x < size; x++) {
    const line = matrix.map((row) => row[x]);
    for (let y = 0; y <= size - 7; y++) {
      if (matches(line, y) && (y < 4 || line.slice(y - 4, y).every((value) => !value)))
        score += 40;
      if (
        matches(line, y) &&
        (y + 11 > size || line.slice(y + 7, y + 11).every((value) => !value))
      )
        score += 40;
    }
  }
  let dark = 0;
  for (const row of matrix) for (const value of row) if (value) dark++;
  score += Math.floor(Math.abs(dark * 20 - size * size * 10) / (size * size)) * 10;
  return score;
}

export function encodeQr(text, { maxVersion = 10 } = {}) {
  const bytes = bytesFor(String(text || ""));
  let version = 0;
  let data = null;
  for (let candidate = 1; candidate <= Math.min(10, maxVersion); candidate++) {
    const words = dataCodewords(bytes, candidate);
    if (words) {
      version = candidate;
      data = words;
      break;
    }
  }
  if (!data) return null;
  const codewords = interleave(data, version);
  let best = null;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    const matrix = makeMatrix(version, codewords, mask);
    const score = penalty(matrix);
    if (score < bestScore) {
      best = matrix;
      bestScore = score;
    }
  }
  return { version, size: best.length, matrix: best };
}

export function qrSvg(text, { title = "QR code" } = {}) {
  const qr = encodeQr(text);
  if (!qr) return { ok: false, reason: "too-long" };
  const border = 4;
  const dimension = qr.size + border * 2;
  const path = qr.matrix
    .flatMap((row, y) =>
      row.map((dark, x) => (dark ? `M${x + border},${y + border}h1v1h-1z` : "")),
    )
    .filter(Boolean)
    .join("");
  return {
    ok: true,
    version: qr.version,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dimension} ${dimension}" role="img" aria-label="${esc(title)}" shape-rendering="crispEdges"><title>${esc(title)}</title><rect width="100%" height="100%" fill="white"/><path d="${path}" fill="black"/></svg>`,
  };
}
