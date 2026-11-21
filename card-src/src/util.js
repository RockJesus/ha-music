// 纯工具函数（无 DOM / 无 lit 依赖，便于单测）

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function formatTime(seconds, fallback = "--:--") {
  if (!Number.isFinite(seconds) || seconds < 0) return fallback;
  const total = Math.round(seconds);
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function hashString(input) {
  const text = String(input ?? "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

// 伪频谱节奏：曲目（歌名+歌手+专辑）决定波形/相位，播放位置决定脉冲强度。
// 不读取真实音频采样，只让动效随播放进度起伏。
export function visualizerFrame(media = {}) {
  const seed =
    [media.title, media.artist, media.album].filter(Boolean).join("|") ||
    "ha-music";
  const hash = hashString(seed);
  const period = 1.7 + ((hash >>> 8) % 90) / 100;
  const phase = ((hash % 360) / 360) * Math.PI * 2;
  const position =
    Number.isFinite(media.position) && media.position > 0
      ? media.position
      : 0;
  const angle = (position / period) * Math.PI * 2 + phase;
  return {
    seed,
    hash,
    period,
    phase,
    position,
    pulse: 0.5 + 0.5 * Math.sin(angle),
    low: 0.5 + 0.5 * Math.sin(angle + 0.55),
    energy: 0.55 + ((hash >>> 16) % 100) / 220,
  };
}

export function hueFromString(input) {
  return hashString(input) % 360;
}

// —— 真实频谱：歌单匹配与 CORS 判定 ——

// 只放行实测会给 Access-Control-Allow-Origin 的音频 CDN。
// 其他源即使能播放，接进 Web Audio 也会被浏览器把输出置零（整首歌变哑），
// 所以必须先判断，拿不到 CORS 就退回程序化律动。
const CORS_AUDIO_HOST =
  /^([a-z0-9-_.]+\.(stream\.qqmusic\.qq\.com|qqmusic\.qq\.com)|aqqmusic\.tc\.qq\.com|[a-z0-9-_.]+\.music\.126\.net)$/i;

export function canTapSpectrumAudio(url, baseUrl = "") {
  if (!url) return false;
  if (/^(data|blob):/i.test(url)) return true;
  try {
    const docBase =
      baseUrl || (typeof location !== "undefined" ? location.href : "http://local/");
    const base = new URL(docBase, "http://local/");
    const target = new URL(url, base.href);
    if (target.protocol !== "http:" && target.protocol !== "https:") return false;
    // HTTPS 页面里的 HTTP 音频会被混合内容拦掉，不要把它算成可接源。
    if (base.protocol === "https:" && target.protocol === "http:") return false;
    if (target.origin === base.origin) return true;
    return CORS_AUDIO_HOST.test(target.hostname);
  } catch {
    return false;
  }
}

export function normalizeTrackText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\([^)]*\)|\[[^\]]*\]|【[^】]*】|（[^）]*）/g, " ")
    .replace(/\b(feat|ft|featuring)\b\.?/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
}

export function normalizeSpectrumPlaylist(data) {
  const raw = Array.isArray(data)
    ? data
    : data?.tracks || data?.audios || data?.songs || data?.list || [];
  return raw
    .map((item) => {
      const artistValue = item?.artist ?? item?.author ?? item?.singer ?? "";
      const artist = Array.isArray(artistValue)
        ? artistValue.filter(Boolean).join(" ")
        : artistValue;
      return {
        mid: String(item?.mid || item?.songmid || item?.songMid || "").trim(),
        name: String(item?.name || item?.title || "").trim(),
        artist: String(artist).trim(),
        url: String(item?.url || item?.src || "").trim(),
        duration: Number(item?.duration ?? 0) || 0,
        cover: String(item?.cover || item?.pic || item?.image || "").trim(),
      };
    })
    .filter((item) => item.url);
}

function mediaContentMid(media = {}) {
  const text = String(
    media.contentId || media.media_content_id || media.content_id || ""
  );
  const match =
    text.match(/track\/([0-9A-Za-z]+)/) || text.match(/id=([0-9A-Za-z]+)/);
  return match ? match[1] : "";
}

export function trackMatchScore(track, media = {}) {
  if (!track?.url) return 0;
  const mid = mediaContentMid(media);
  if (mid && track.mid && mid === track.mid) return 1;

  const title = normalizeTrackText(media.title || media.media_title || "");
  const artist = normalizeTrackText(media.artist || media.media_artist || "");
  const tTitle = normalizeTrackText(track.name || track.title || "");
  const tArtist = normalizeTrackText(track.artist || "");
  if (!tTitle) return 0;

  let score = 0;
  if (title && tTitle === title) {
    score = 0.9;
  } else if (title && (tTitle.startsWith(title) || title.startsWith(tTitle))) {
    score = 0.78;
  } else if (title) {
    const wanted = title.split(" ").filter(Boolean);
    const candidates = new Set(tTitle.split(" ").filter(Boolean));
    const common = wanted.filter((token) => candidates.has(token)).length;
    const coverage = wanted.length ? common / wanted.length : 0;
    if (coverage >= 0.8) score = 0.68;
    else if (coverage >= 0.5) score = 0.5;
  }

  if (artist && tArtist) {
    if (artist === tArtist) score += 0.1;
    else if (tArtist.includes(artist) || artist.includes(tArtist)) score += 0.06;
    else score -= 0.08;
  }
  return clamp(score, 0, 1);
}

export function findSpectrumTrack(tracks, media = {}) {
  const list = Array.isArray(tracks) ? tracks : normalizeSpectrumPlaylist(tracks);
  let best = null;
  let bestScore = 0;
  for (const track of list) {
    const score = trackMatchScore(track, media);
    if (score > bestScore) {
      best = track;
      bestScore = score;
    }
  }
  return bestScore >= 0.66 ? best : null;
}

export function hasFeature(state, flag) {
  const supported = Number(state?.attributes?.supported_features ?? 0);
  if (!Number.isFinite(supported) || !flag) return false;
  return (supported & flag) === flag;
}

export function stateOf(hass, entityId) {
  if (!hass || !entityId) return undefined;
  return hass.states ? hass.states[entityId] : undefined;
}

// 多播放器卡片：优先跟随正在播放的实体。
// - 当前实体正在播放时保持不变，避免多台同时播放时来回跳。
// - 当前实体暂停/待机时，切到 playing；没有 playing 再考虑 buffering。
// - 多台同时播放时，优先 media_position_updated_at 最新的一台。
export function pickPlayingEntity(hass, entities = [], current = "") {
  const list = Array.isArray(entities) ? entities.filter(Boolean) : [];
  if (!list.length) return "";
  const hasCurrent = list.includes(current);
  const active = hasCurrent ? current : "";
  const stateRank = (entityId) => {
    const value = hass?.states?.[entityId]?.state;
    if (value === "playing") return 2;
    if (value === "buffering") return 1;
    return 0;
  };
  if (hasCurrent && stateRank(active) === 2) return active;
  let best = active || list[0];
  let bestRank = active ? stateRank(active) : 0;
  let bestStamp = -Infinity;
  for (const entityId of list) {
    const rank = stateRank(entityId);
    if (rank <= 0) continue;
    const stamp = Date.parse(hass?.states?.[entityId]?.attributes?.media_position_updated_at || "");
    const score = Number.isFinite(stamp) ? stamp : 0;
    if (rank > bestRank || (rank === bestRank && score > bestStamp)) {
      best = entityId;
      bestRank = rank;
      bestStamp = score;
    }
  }
  return bestRank > 0 ? best : active;
}

// 多播放器自动跟随的“非打扰”版本：
// 只在首次加载、或目标播放器刚开始 playing/buffering 时跟随一次。
// 当前播放器已在播放则保持不动；已经播放的其它播放器不会把用户手动选择抢回去。
export function pickAutoFollowEntity(
  hass,
  entities = [],
  current = "",
  previousStates = null
) {
  const list = Array.isArray(entities) ? entities.filter(Boolean) : [];
  if (list.length < 2) return "";
  const target = pickPlayingEntity(hass, list, current);
  if (!target || target === current) return "";
  const targetState = hass?.states?.[target]?.state;
  if (targetState !== "playing" && targetState !== "buffering") return "";
  if (previousStates && previousStates[target] === targetState) return "";
  return target;
}

export function friendlyName(hass, entityId, fallback = "") {
  const state = stateOf(hass, entityId);
  return state?.attributes?.friendly_name || entityId || fallback;
}

// 兼容 media_player 新旧元数据（media_metadata 优先，回退到扁平属性）
export function readMedia(state) {
  const attrs = state?.attributes ?? {};
  const meta = attrs.media_metadata ?? {};
  // Music Assistant 切歌时先更新 media_metadata，扁平的 media_title/artist
  // 会晚一拍；但 media_metadata.duration 可能仍是上一首的旧值。
  // 时长优先用扁平 media_duration（HA 会随当前队列项更新），缺失才回退元数据。
  const flatDuration = Number(attrs.media_duration ?? 0);
  const metaDuration = Number(meta.duration ?? 0);
  const duration = flatDuration > 0 ? flatDuration : metaDuration;
  let position = Number(attrs.media_position ?? 0);
  const updatedAt = attrs.media_position_updated_at;
  if (state?.state === "playing" && updatedAt) {
    const elapsed = (Date.now() - new Date(updatedAt).getTime()) / 1000;
    if (Number.isFinite(elapsed) && elapsed > 0) position += elapsed;
  }
  if (Number.isFinite(duration) && duration > 0) {
    position = clamp(position, 0, duration);
  } else if (!Number.isFinite(position) || position < 0) {
    position = 0;
  }
  return {
    title: meta.title || attrs.media_title || "",
    artist:
      meta.artist ||
      attrs.media_artist ||
      meta.album_artist ||
      attrs.media_album_artist ||
      "",
    album: meta.album_name || attrs.media_album_name || "",
    series: meta.series_title || attrs.media_series_title || "",
    track: meta.track_number ?? attrs.media_track ?? "",
    duration: Number.isFinite(duration) ? duration : 0,
    position: Number.isFinite(position) ? position : 0,
    art:
      attrs.entity_picture ||
      meta.entity_picture ||
      meta.image_url ||
      attrs.media_image_url ||
      "",
    appName: attrs.app_name || "",
    source: attrs.source || "",
    soundMode: attrs.sound_mode || "",
    shuffle: Boolean(attrs.shuffle),
    repeat: attrs.repeat || "off",
    volume: Number.isFinite(Number(attrs.volume_level))
      ? Number(attrs.volume_level)
      : null,
    muted: Boolean(attrs.is_volume_muted),
    groupMembers: Array.isArray(attrs.group_members) ? attrs.group_members : [],
  };
}

export function readQueue(state, limit = 60) {
  const raw = state?.attributes?.queue;
  if (!Array.isArray(raw)) return [];
  return raw.slice(0, limit).map((item, index) => ({
    index,
    title: item.title || item.name || item.media_title || "",
    artist: item.artist || item.subtitle || item.media_artist || "",
    album: item.album || item.album_name || "",
    duration: Number(item.duration ?? item.media_duration ?? 0) || 0,
    art: item.entity_picture || item.thumbnail || item.artwork || "",
    contentId: item.media_content_id || item.content_id || "",
    contentType: item.media_content_type || item.content_type || "",
    queueItemId: item.queue_item_id || item.queueItemId || "",
    active: Boolean(
      item.active || item.is_active || item.current || item.playing
    ),
  }));
}

// Music Assistant 的完整队列由 mass_queue 集成读取；字段比 HA 原生 queue 更扁平。
// 当前曲目以 queue_item_id / media_content_id 双重匹配，避免同名歌曲误高亮。
function queueImage(media = {}, item = {}) {
  const pick = (value) => {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return value.url || value.path || "";
    return "";
  };
  const direct =
    pick(media.image) ||
    pick(item.media_image) ||
    pick(item.art) ||
    pick(item.entity_picture);
  if (direct) return direct;
  const images = media.metadata?.images;
  if (Array.isArray(images)) {
    const found = images.find((image) => image && image.remotely_accessible !== false) || images[0];
    return pick(found);
  }
  return "";
}

export function readMassQueueItems(items, currentQueueItemId = "", currentContentId = "") {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    const media = item?.media_item || {};
    const contentId =
      media.uri || item?.media_content_id || item?.contentId || item?.uri || "";
    const queueItemId = item?.queue_item_id || item?.queueItemId || "";
    const active =
      Boolean(item?.active || item?.is_active || item?.current || item?.playing) ||
      Boolean(currentQueueItemId && queueItemId === currentQueueItemId) ||
      Boolean(!currentQueueItemId && currentContentId && contentId === currentContentId);
    const artists = Array.isArray(media.artists)
      ? media.artists.map((artist) => artist?.name).filter(Boolean).join(", ")
      : "";
    return {
      index,
      title:
        item?.media_title ||
        item?.title ||
        media.name ||
        (queueItemId && item?.name) ||
        "",
      artist: item?.media_artist || artists || item?.artist || "",
      album: item?.media_album_name || media.album?.name || item?.album || "",
      duration: Number(item?.media_duration ?? item?.duration ?? 0) || 0,
      art:
        item?.local_image_encoded ||
        queueImage(media, item),
      contentId,
      contentType:
        media.media_type || item?.media_content_type || item?.contentType || "music",
      queueItemId,
      active,
    };
  });
}

// music_assistant.get_queue 只返回当前/下一首；作为没有 mass_queue 时的兜底，
// 让用户至少能看到当前队列位置并直接切歌。
export function readMaQueueDetails(details, currentContentId = "") {
  if (!details || typeof details !== "object") return [];
  const currentIndex = Number(details.current_index);
  const items = [];
  const push = (entry, offset) => {
    if (!entry || typeof entry !== "object") return;
    const media = entry.media_item || {};
    const artists = Array.isArray(media.artists)
      ? media.artists.map((artist) => artist?.name).filter(Boolean).join(", ")
      : "";
    const contentId = media.uri || entry.media_content_id || "";
    items.push({
      index: Number.isFinite(currentIndex) ? currentIndex + offset : offset,
      title: media.name || entry.media_title || entry.name || "",
      artist: artists || entry.media_artist || "",
      album: media.album?.name || entry.media_album_name || "",
      duration: Number(entry.duration ?? media.duration ?? 0) || 0,
      art: media.image || entry.media_image || entry.entity_picture || "",
      contentId,
      contentType: media.media_type || "music",
      queueItemId: entry.queue_item_id || "",
      active: offset === 0 || Boolean(currentContentId && contentId === currentContentId),
    });
  };
  push(details.current_item, 0);
  push(details.next_item, 1);
  return items;
}

export function normalizeArt(hass, path) {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  if (hass?.hassUrl) return hass.hassUrl(path);
  return path;
}

// 把外部 HTTP 封面改走 HA 同源代理，并用带鉴权的 fetch 转成 blob URL。
// HTTPS 页面直接加载 http://<LAN-IP> 封面会被浏览器按混合内容拦截，
// 表现就是封面空白、FAB 反复重试/闪烁。代理与 blob 缓存都按原始封面地址去重。
const artBlobCache = new Map();

export async function resolveArtUrl(hass, path, entityId) {
  if (!path) return "";
  const isHttp = /^http:\/\//i.test(path);
  const httpsPage =
    typeof window !== "undefined" && window.location?.protocol === "https:";
  if (!isHttp || !httpsPage || !entityId || !hass?.fetchWithAuth) {
    return normalizeArt(hass, path);
  }
  const proxy = `/api/media_player_proxy/${encodeURIComponent(
    entityId
  )}?v=${hashString(path)}`;
  if (artBlobCache.has(proxy)) return artBlobCache.get(proxy);
  try {
    const response = await hass.fetchWithAuth(proxy);
    if (!response?.ok) throw new Error(`cover proxy ${response?.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    artBlobCache.set(proxy, objectUrl);
    return objectUrl;
  } catch {
    // 代理不可用时宁可不显示，也不要把被拦截的 HTTP 地址塞回 <img>。
    return "";
  }
}

export function pickVolumeState(hass, config) {
  if (config?.volume_entity && hass?.states?.[config.volume_entity]) {
    return hass.states[config.volume_entity];
  }
  return undefined;
}

// CSS 颜色转换（调色板输出 rgb 三元组给 rgba() 用）
export function hslToRgb(h, s, l) {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let rgb = [0, 0, 0];
  if (hp < 1) rgb = [c, x, 0];
  else if (hp < 2) rgb = [x, c, 0];
  else if (hp < 3) rgb = [0, c, x];
  else if (hp < 4) rgb = [0, x, c];
  else if (hp < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const m = light - c / 2;
  return rgb.map((value) =>
    Math.round(clamp((value + m) * 255, 0, 255))
  );
}

export function deterministicPalette(seed) {
  const hue = hueFromString(seed);
  const hue2 = (hue + 42 + (hashString(seed + "2") % 40)) % 360;
  const rgb1 = hslToRgb(hue, 72, 58);
  const rgb2 = hslToRgb(hue2, 68, 52);
  return {
    a1: `hsl(${hue} 72% 58%)`,
    a2: `hsl(${hue2} 68% 52%)`,
    rgb1: rgb1.join(","),
    rgb2: rgb2.join(","),
  };
}

export function hexToRgbTriplet(hex) {
  const clean = String(hex).replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (!/^[0-9a-f]{6}$/i.test(full)) return null;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ].join(",");
}

export function colorTriplet(color, fallback = "255,255,255") {
  const text = String(color || "").trim();
  if (/^#[0-9a-f]{3,8}$/i.test(text)) {
    return hexToRgbTriplet(text.slice(0, 7)) || fallback;
  }
  const hsl = text.match(/hsla?\(\s*([\d.]+)[,\s]+([\d.]+)%[,\s]+([\d.]+)%/i);
  if (hsl) {
    return hslToRgb(Number(hsl[1]), Number(hsl[2]), Number(hsl[3])).join(",");
  }
  const rgb = text.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (rgb) return `${rgb[1]},${rgb[2]},${rgb[3]}`;
  return fallback;
}


export function hexToHsl(hex) {
  const triplet = hexToRgbTriplet(hex);
  if (!triplet) return { h: 0, s: 0, l: 50 };
  const [r, g, b] = triplet.split(",").map((v) => Number(v) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const light = (max + min) / 2;
  const delta = max - min;
  let hue = 0;
  let sat = 0;
  if (delta !== 0) {
    sat = delta / (1 - Math.abs(2 * light - 1));
    if (max === r) hue = ((g - b) / delta) % 6;
    else if (max === g) hue = (b - r) / delta + 2;
    else hue = (r - g) / delta + 4;
    hue = (hue * 60 + 360) % 360;
  }
  return { h: hue, s: sat * 100, l: light * 100 };
}

// 以最短色相路径混合两个 HSL 颜色
export function mixHsl(a, b, weightB = 0.5) {
  const delta = ((b.h - a.h + 540) % 360) - 180;
  const h = (a.h + delta * weightB + 360) % 360;
  const s = a.s + (b.s - a.s) * weightB;
  const l = a.l + (b.l - a.l) * weightB;
  return {
    h,
    s,
    l,
    css: `hsl(${Math.round(h)} ${Math.round(clamp(s, 25, 92))}% ${Math.round(clamp(l, 38, 72))}%)`,
    rgb: hslToRgb(h, clamp(s, 25, 92), clamp(l, 38, 72)).join(","),
  };
}
