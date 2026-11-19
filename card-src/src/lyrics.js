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


// 清理平台标题里的现场版、括号说明和分隔符，提升跨库匹配率。
// 例如 "Shape of You (Live) [Remix]" -> "Shape of You"
export function cleanLyricText(value) {
  return String(value || "")
    .replace(/\([^)]*\)|\[[^\]]*\]|（[^）]*）|【[^】]*】/g, " ")
    .replace(/[\s\-_~～|/]+/g, " ")
    .trim();
}

// 当前行在「本行开始 -> 下一行开始」之间的进度，用于歌词卡拉OK填充。
export function lyricProgress(lines, position, duration) {
  const index = lyricIndex(lines, position);
  if (index < 0) return { index: -1, progress: 0 };
  const start = Number(lines[index].time) || 0;
  const next = lines[index + 1]?.time;
  const end = Number.isFinite(next)
    ? next
    : Number(duration) > start
      ? Number(duration)
      : start + 4;
  const span = Math.max(0.05, end - start);
  return {
    index,
    progress: Math.max(0, Math.min(1, (Math.max(0, Number(position) || 0) - start) / span)),
  };
}

function compactMatchText(value) {
  return cleanLyricText(value)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "");
}

// 从 LRCLIB 搜索结果里挑最可信的一版：歌名、歌手、时长三项投票，
// 优先同步歌词，避免同名翻唱/现场版把时间轴带偏。
export function pickLrclibResult(results, media = {}) {
  if (!Array.isArray(results) || !results.length) return null;
  const wantTitle = compactMatchText(media.title);
  const wantArtist = compactMatchText(media.artist);
  const wantDuration = Number(media.duration) || 0;
  let best = null;
  let bestScore = -Infinity;

  for (const item of results) {
    if (!item) continue;
    const lyric = item.syncedLyrics || item.plainLyrics;
    if (typeof lyric !== "string" || !lyric.trim()) continue;
    const itemTitle = compactMatchText(item.trackName);
    const itemArtist = compactMatchText(item.artistName);
    let score = 0;

    if (wantTitle) {
      if (itemTitle === wantTitle) score += 120;
      else if (itemTitle && (itemTitle.includes(wantTitle) || wantTitle.includes(itemTitle))) score += 60;
      else score -= 35;
    }
    if (wantArtist && itemArtist) {
      if (itemArtist === wantArtist) score += 45;
      else if (itemArtist.includes(wantArtist) || wantArtist.includes(itemArtist)) score += 32;
      else score -= 200;
    }
    const itemDuration = Number(item.duration) || 0;
    if (wantDuration && itemDuration) {
      const diff = Math.abs(itemDuration - wantDuration);
      if (diff <= 2) score += 80;
      else if (diff <= 5) score += 35;
      else if (diff <= 15) score += 10;
      else score -= Math.min(45, diff);
    }
    if (item.syncedLyrics) score += 30;
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  // 歌名完全对不上时宁可不用，避免把另一首歌的歌词投到当前曲目上。
  if (best && wantTitle && bestScore < 120) return null;
  return best;
}
