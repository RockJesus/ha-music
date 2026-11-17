// 全局歌词解析：自动跟随正在播放的 media_player，多源匹配歌词。
// 卡片与全局歌词悬浮窗共用同一套「实体选择 + 歌词查询」规则。
import { cleanLyricText, parseLyrics, pickLrclibResult } from "./lyrics.js";
import { readMedia } from "./util.js";

const NETEASE_API = "/api/netease_lyrics/lyrics";
const LRCLIB_API = "https://lrclib.net/api";
const LYRICS_OVH_API = "https://api.lyrics.ovh/v1";
const REQUEST_TIMEOUT = 4500;

const cache = new Map();
const inflight = new Map();

function trimValue(value) {
  return String(value || "").trim();
}

function dedupeQueries(list) {
  const seen = new Set();
  return list.filter((item) => {
    if (!item?.title) return false;
    const key = `${item.title}|${item.artist || ""}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// 平台标题常带现场版、混音版、括号说明；同时保留原始值，避免清洗过头。
export function lyricsQueryVariants(media = {}) {
  const rawTitle = trimValue(media.title);
  const rawArtist = trimValue(media.artist);
  const cleanTitle = cleanLyricText(rawTitle);
  const cleanArtist = cleanLyricText(rawArtist);
  return dedupeQueries([
    { title: cleanTitle || rawTitle, artist: cleanArtist || rawArtist, rawTitle, rawArtist },
    { title: cleanTitle || rawTitle, artist: "", rawTitle, rawArtist },
    { title: rawTitle, artist: rawArtist, rawTitle, rawArtist },
    { title: rawTitle, artist: cleanArtist, rawTitle, rawArtist },
  ]);
}

export function globalTrackKey(entityId, state) {
  const attrs = state?.attributes || {};
  return [
    entityId,
    attrs.media_title || "",
    attrs.media_artist || "",
    attrs.media_album_name || "",
    attrs.media_duration || 0,
    attrs.media_content_id || "",
  ]
    .map((value) => String(value))
    .join("|");
}

function stateScore(state, entityId, preferred) {
  const media = readMedia(state);
  if (!media.title) return -Infinity;
  const attrs = state.attributes || {};
  const value = state.state;
  let score = 0;
  if (value === "playing") score += 1000;
  else if (value === "buffering") score += 650;
  else if (value === "paused") score += 180;
  else if (value === "idle") score += 40;
  else return -Infinity;
  if (entityId === preferred) score += 300;
  // 优先音乐播放器/MA 队列，避免选中电视盒子或投屏设备。
  if (attrs.mass_player_type || attrs.active_queue || /music\s*assistant/i.test(attrs.source || "")) {
    score += 35;
  }
  if (attrs.media_class === "music" || attrs.media_content_type === "music") score += 12;
  const stamp = Date.parse(attrs.media_position_updated_at || "");
  if (Number.isFinite(stamp)) {
    // 只作为同状态下的轻微排序，避免旧时间戳压过真正的播放器。
    score += Math.min(20, Math.max(0, (stamp - 1_600_000_000_000) / 1_000_000_000_000));
  }
  return score;
}

// 全局自动识别：优先当前卡片的播放器；若它没在播放，则找最近在播放的 media_player。
export function pickGlobalLyricsEntity(hass, preferred = "") {
  const states = hass?.states || {};
  let best = "";
  let bestScore = -Infinity;
  for (const [entityId, state] of Object.entries(states)) {
    if (!entityId.startsWith("media_player.")) continue;
    if (!state || ["unavailable", "unknown", "off"].includes(state.state)) continue;
    const score = stateScore(state, entityId, preferred);
    if (score > bestScore) {
      best = entityId;
      bestScore = score;
    }
  }
  if (best) return best;
  if (preferred && states[preferred] && readMedia(states[preferred]).title) return preferred;
  return "";
}

function withTimeout(signal) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", onAbort, { once: true });
  }
  return {
    signal: controller.signal,
    cleanup() {
      clearTimeout(timer);
      if (signal) signal.removeEventListener("abort", onAbort);
    },
  };
}

async function requestJson(url, { signal, headers } = {}) {
  const guard = withTimeout(signal);
  try {
    const response = await fetch(url, {
      signal: guard.signal,
      mode: "cors",
      headers: { Accept: "application/json", ...(headers || {}) },
    });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`lyrics HTTP ${response.status}`);
    return response.json();
  } finally {
    guard.cleanup();
  }
}

function parsedOrNull(raw) {
  if (!raw || typeof raw !== "string") return null;
  const parsed = parseLyrics(raw);
  if (!parsed.lines.length && !parsed.plain.length && !parsed.instrumental) return null;
  return parsed;
}

async function requestNetease(media, query, { hass, source, signal }) {
  const token = hass?.auth?.data?.access_token;
  if (!token) return null;
  const url = new URL(NETEASE_API, window.location.origin);
  url.searchParams.set("title", query.title);
  url.searchParams.set("artist", query.artist || "");
  if (source !== "auto") url.searchParams.set("source", source);
  const data = await requestJson(url.toString(), {
    signal,
    headers: { Authorization: `Bearer ${token}` },
  });
  const parsed = parsedOrNull(data?.lyrics);
  if (!parsed) return null;
  const label = data?.source === "qq" ? "QQ音乐" : data?.source === "netease" ? "网易云" : "歌词接口";
  return { parsed, source: label };
}

async function requestLrclib(media, query, signal) {
  const rawTitle = trimValue(query.rawTitle || media.title);
  const rawArtist = trimValue(query.rawArtist || media.artist);
  const cleanTitle = cleanLyricText(rawTitle) || rawTitle;
  const cleanArtist = cleanLyricText(rawArtist);
  const duration = Math.round(Number(media.duration) || 0);
  const queries = [
    { track_name: cleanTitle, artist_name: cleanArtist, album_name: media.album, duration },
    { track_name: rawTitle, artist_name: rawArtist, album_name: media.album, duration },
    { q: [rawTitle, cleanArtist || rawArtist].filter(Boolean).join(" ") },
  ].filter((item) => item.track_name || item.q);

  for (const params of queries) {
    try {
      const url = new URL(`${LRCLIB_API}/search`);
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== null && String(value).trim()) {
          url.searchParams.set(key, String(value));
        }
      }
      const results = await requestJson(url.toString(), { signal });
      if (!Array.isArray(results)) continue;
      const match = pickLrclibResult(results, {
        title: cleanTitle,
        artist: cleanArtist || rawArtist,
        duration: media.duration,
      });
      if (!match) continue;
      const parsed = parsedOrNull(match.syncedLyrics || match.plainLyrics);
      if (parsed) return { parsed, source: "LRCLIB" };
    } catch (error) {
      if (error?.name === "AbortError") throw error;
    }
  }

  // 精确接口只在时长和歌手都存在时有意义；放在搜索之后，避免阻塞首屏。
  if (duration && rawArtist) {
    try {
      const url = new URL(`${LRCLIB_API}/get`);
      url.searchParams.set("track_name", cleanTitle || rawTitle);
      url.searchParams.set("artist_name", cleanArtist || rawArtist);
      if (media.album) url.searchParams.set("album_name", media.album);
      url.searchParams.set("duration", String(duration));
      const item = await requestJson(url.toString(), { signal });
      const parsed = parsedOrNull(item?.syncedLyrics || item?.plainLyrics);
      if (parsed) return { parsed, source: "LRCLIB" };
      if (item?.instrumental) {
        return { parsed: { lines: [], plain: [], instrumental: true }, source: "LRCLIB" };
      }
    } catch (error) {
      if (error?.name === "AbortError") throw error;
    }
  }
  return null;
}

async function requestLyricsOvh(media, query, signal) {
  const artist = trimValue(query.artist || media.artist);
  const title = trimValue(query.title || media.title);
  if (!artist || !title) return null;
  const url = `${LYRICS_OVH_API}/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`;
  const data = await requestJson(url, { signal });
  const parsed = parsedOrNull(data?.lyrics);
  if (!parsed) return null;
  return { parsed, source: "Lyrics.ovh" };
}

function blank(status, source = "歌词接口") {
  return { status, lines: [], plain: [], instrumental: false, source };
}

async function resolveLyrics(media, options) {
  const { hass, source = "auto", signal } = options || {};
  if (!trimValue(media.title)) return blank("none");

  const queries = lyricsQueryVariants(media);
  const first = queries[0];
  if (!first) return blank("none");

  if (source !== "lrclib") {
    try {
      const result = await requestNetease(media, first, { hass, source, signal });
      if (result) {
        return {
          status: "ready",
          lines: result.parsed.lines || [],
          plain: result.parsed.plain || [],
          instrumental: Boolean(result.parsed.instrumental),
          source: result.source,
        };
      }
    } catch (error) {
      if (error?.name === "AbortError") throw error;
    }
  }

  try {
    for (const query of queries.slice(0, 2)) {
      const result = await requestLrclib(media, query, signal);
      if (result) {
        return {
          status: "ready",
          lines: result.parsed.lines || [],
          plain: result.parsed.plain || [],
          instrumental: Boolean(result.parsed.instrumental),
          source: result.source,
        };
      }
    }
  } catch (error) {
    if (error?.name === "AbortError") throw error;
  }

  // 仍无结果时用 Lyrics.ovh 兜底；它是纯文本歌词，没有时间轴。
  if (source !== "lrclib") {
    try {
      const result = await requestLyricsOvh(media, first, signal);
      if (result) {
        return {
          status: "ready",
          lines: result.parsed.lines || [],
          plain: result.parsed.plain || [],
          instrumental: Boolean(result.parsed.instrumental),
          source: result.source,
        };
      }
    } catch (error) {
      if (error?.name === "AbortError") throw error;
    }
  }

  return blank("none");
}

export function fetchGlobalLyrics(state, options = {}) {
  const media = readMedia(state);
  if (!trimValue(media.title)) return Promise.resolve(blank("none"));
  const key = [
    media.title,
    media.artist,
    media.album,
    media.duration,
    options.source || "auto",
  ]
    .join("|")
    .toLowerCase();
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);
  const running = inflight.get(key);
  if (running) return running;

  const promise = resolveLyrics(media, options)
    .then((result) => {
      cache.set(key, result);
      if (cache.size > 40) cache.delete(cache.keys().next().value);
      return result;
    })
    .catch((error) => {
      if (error?.name === "AbortError") throw error;
      return blank("error");
    })
    .finally(() => {
      inflight.delete(key);
    });
  inflight.set(key, promise);
  return promise;
}
