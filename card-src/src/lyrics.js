// 歌词解析：优先 LRC 时间轴，退化为纯文本行。
const META_RE = /^\[(ar|ti|al|by|offset|re|ve):.*\]$/i;
const TIME_RE = /\[(\d{1,3}):(\d{1,2})(?:[.:](\d{1,3}))?\]/g;

function fractionToSeconds(raw) {
  if (!raw) return 0;
  const value = Number(raw);
  if (!Number.isFinite(value)) return 0;
  if (raw.length === 1) return value / 10;
  if (raw.length === 2) return value / 100;
  return value / 1000;
}

export function parseLyrics(raw) {
  if (!raw) return { lines: [], plain: [], instrumental: false };
  const text = String(raw).replace(/\r\n?/g, "\n");
  const timed = [];
  const plain = [];
  let instrumental = false;

  for (const sourceLine of text.split("\n")) {
    const line = sourceLine.trim();
    if (!line) continue;
    if (META_RE.test(line)) continue;
    if (/^\[instrumental\]$/i.test(line)) {
      instrumental = true;
      continue;
    }

    const times = [];
    TIME_RE.lastIndex = 0;
    let match = TIME_RE.exec(line);
    while (match) {
      const minutes = Number(match[1]);
      const seconds = Number(match[2]);
      const fraction = fractionToSeconds(match[3]);
      const total = minutes * 60 + seconds + fraction;
      if (Number.isFinite(total)) times.push(total);
      match = TIME_RE.exec(line);
    }

    const content = line.replace(TIME_RE, "").trim();
    if (!content) continue;
    if (times.length) {
      for (const time of times) timed.push({ time, text: content });
    } else {
      plain.push(content);
    }
  }

  timed.sort((a, b) => a.time - b.time);
  const lines = timed.filter(
    (item, index) =>
      !index ||
      item.time !== timed[index - 1].time ||
      item.text !== timed[index - 1].text
  );
  return { lines, plain, instrumental };
}

export function lyricIndex(lines, position) {
  if (!Array.isArray(lines) || !lines.length) return -1;
  const target = Math.max(0, Number(position) || 0) + 0.001;
  let low = 0;
  let high = lines.length - 1;
  let found = -1;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (lines[mid].time <= target) {
      found = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return found;
}
