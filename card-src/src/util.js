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

export function hueFromString(input) {
  return hashString(input) % 360;
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

export function friendlyName(hass, entityId, fallback = "") {
  const state = stateOf(hass, entityId);
  return state?.attributes?.friendly_name || entityId || fallback;
}

// 兼容 media_player 新旧元数据（media_metadata 优先，回退到扁平属性）
export function readMedia(state) {
  const attrs = state?.attributes ?? {};
  const meta = attrs.media_metadata ?? {};
  const duration = Number(attrs.media_duration ?? meta.duration ?? 0);
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
    title: attrs.media_title || meta.title || "",
    artist:
      attrs.media_artist ||
      meta.artist ||
      attrs.media_album_artist ||
      meta.album_artist ||
      "",
    album: attrs.media_album_name || meta.album_name || "",
    series: attrs.media_series_title || meta.series_title || "",
    track: attrs.media_track ?? meta.track_number ?? "",
    duration: Number.isFinite(duration) ? duration : 0,
    position: Number.isFinite(position) ? position : 0,
    art:
      meta.entity_picture ||
      meta.image_url ||
      attrs.entity_picture ||
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
    active: Boolean(
      item.active || item.is_active || item.current || item.playing
    ),
  }));
}

export function normalizeArt(hass, path) {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  if (hass?.hassUrl) return hass.hassUrl(path);
  return path;
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
