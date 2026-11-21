import { hashString, hslToRgb } from "./util.js";

const CJK = /[\u3400-\u9fff\uf900-\ufaff]/;
const NON_WORD = /[^\p{L}\p{N}]/gu;

function color(h, s, l, alpha = 1) {
  const [r, g, b] = hslToRgb(h, s, l);
  return alpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function clean(value, limit = 40) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function firstGlyph(value) {
  const word = clean(value, 80).replace(NON_WORD, "");
  return word ? Array.from(word)[0] : "";
}

export function coverMonogram(title, artist) {
  const primary = clean(title, 80) || clean(artist, 80);
  if (!primary) return "";

  if (CJK.test(primary)) {
    const first = Array.from(primary)[0] || "";
    return CJK.test(first) ? first : firstGlyph(primary);
  }

  const words = primary.split(" ").filter(Boolean);
  if (words.length > 1) {
    const first = firstGlyph(words[0]);
    const second = firstGlyph(words[1]);
    return `${first}${second}`.toUpperCase();
  }

  const compact = primary.replace(NON_WORD, "");
  return Array.from(compact).slice(0, 2).join("").toUpperCase();
}

/**
 * Build a deterministic, self-contained cover for tracks without artwork.
 * Uses the title/artist as the seed so the same local track always gets the
 * same colours and monogram, even after a restart.
 */
export function fallbackCover(media = {}) {
  const title = clean(media.title, 48);
  const artist = clean(media.artist || media.album, 48);
  if (!title && !artist) return "";

  const album = clean(media.album, 48);
  const seed = [title, artist, album].filter(Boolean).join("|");
  const monogram = coverMonogram(title, artist) || "♪";
  const hash = hashString(seed);
  const hue = hash % 360;
  const hue2 = (hue + 34 + ((hash >>> 7) % 54)) % 360;
  const hue3 = (hue + 176 + ((hash >>> 12) % 40)) % 360;
  const angle = (hash >>> 4) % 360;
  const x1 = 22 + ((hash >>> 8) % 56);
  const y1 = 18 + ((hash >>> 14) % 52);
  const x2 = 26 + ((hash >>> 18) % 52);
  const y2 = 24 + ((hash >>> 22) % 54);
  const dotX = 126 + ((hash >>> 3) % 260);
  const dotY = 126 + ((hash >>> 11) % 260);
  const glyphSize = Array.from(monogram).length > 1 ? 92 : 116;
  const label = artist ? escapeXml(clean(artist, 24)) : "";
  const baseA = color(hue, 36, 15);
  const baseB = color(hue2, 32, 8);
  const baseC = color(hue3, 40, 6);
  const glowA = color(hue, 70, 52);
  const glowAMid = color(hue, 66, 46);
  const glowAEnd = color(hue, 66, 42);
  const glowB = color(hue2, 74, 54);
  const glowBMid = color(hue2, 70, 48);
  const glowBEnd = color(hue2, 70, 44);
  const wedge = color(hue3, 56, 38);
  const dot = color(hue, 78, 66);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1" gradientTransform="rotate(${angle} 256 256)">
      <stop offset="0" stop-color="${baseA}"/>
      <stop offset=".52" stop-color="${baseB}"/>
      <stop offset="1" stop-color="${baseC}"/>
    </linearGradient>
    <radialGradient id="glowA" cx="${x1}%" cy="${y1}%" r="58%">
      <stop offset="0" stop-color="${glowA}" stop-opacity=".46"/>
      <stop offset=".42" stop-color="${glowAMid}" stop-opacity=".15"/>
      <stop offset="1" stop-color="${glowAEnd}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="${x2}%" cy="${y2}%" r="54%">
      <stop offset="0" stop-color="${glowB}" stop-opacity=".38"/>
      <stop offset=".48" stop-color="${glowBMid}" stop-opacity=".12"/>
      <stop offset="1" stop-color="${glowBEnd}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
  </defs>
  <rect width="512" height="512" fill="url(#base)"/>
  <circle cx="${x1}%" cy="${y1}%" r="46%" fill="url(#glowA)" filter="url(#soft)"/>
  <circle cx="${x2}%" cy="${y2}%" r="42%" fill="url(#glowB)" filter="url(#soft)"/>
  <path d="M-40 394 C 128 292, 286 468, 552 318 L552 552 L-40 552 Z" fill="${wedge}" opacity=".1"/>
  <rect width="512" height="512" fill="#05060a" opacity=".18"/>
  <circle cx="256" cy="256" r="204" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="1.4"/>
  <circle cx="256" cy="256" r="184" fill="#05060a" fill-opacity=".2" stroke="#ffffff" stroke-opacity=".08" stroke-width="1"/>
  <circle cx="${dotX}" cy="${dotY}" r="4.5" fill="${dot}" opacity=".75"/>
  <text x="256" y="256" text-anchor="middle" dominant-baseline="middle" font-family="'Segoe UI', 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif" font-size="${glyphSize}" font-weight="700" letter-spacing="2" fill="#ffffff" fill-opacity=".94">${escapeXml(monogram)}</text>
  ${label ? `<text x="256" y="362" text-anchor="middle" font-family="'Segoe UI', 'Microsoft YaHei', 'PingFang SC', 'Noto Sans SC', sans-serif" font-size="19" font-weight="500" letter-spacing="2.4" fill="#ffffff" fill-opacity=".58">${label}</text>` : ""}
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
