// 打包入口：注册卡片与可视化编辑器
import "./ha-music-card.js";
import "./ha-music-editor.js";
import {
  installDocks,
  loadDockPref,
  resolveHass,
  normalizeDockModes,
  normalizeDockThemes,
} from "./dock.js";
import { installLyricDock, loadLyricDockPref } from "./lyric-dock.js";
import { DEFAULT_THEME } from "./const.js";

// 同一个 bundle 既可作为 Lovelace 资源，也可作为全局模块加载。
// 迷你播放器的位置由卡片 `dock` 配置记忆到 localStorage；也可用模块 URL 强制指定：
//   ?dock=top|sidebar|fab（可逗号组合）&dock_entity=media_player.xxx
const moduleUrl = new URL(import.meta.url);
const queryMode = moduleUrl.searchParams.get("dock");
const pref = loadDockPref();
const modes = queryMode
  ? normalizeDockModes(queryMode === "1" ? "top" : queryMode)
  : pref?.modes || [];
const entities = { ...(pref?.entities || {}) };
const themes = normalizeDockThemes(pref?.themes);
const queryEntity = moduleUrl.searchParams.get("dock_entity");
if (queryEntity && modes[0]) entities[modes[0]] = queryEntity;
const queryTheme = moduleUrl.searchParams.get("dock_theme");
if (queryTheme && modes[0]) themes[modes[0]] = queryTheme;
for (const mode of modes) {
  const scoped = moduleUrl.searchParams.get(`dock_entity_${mode}`);
  if (scoped) entities[mode] = scoped;
  const scopedTheme = moduleUrl.searchParams.get(`dock_theme_${mode}`);
  if (scopedTheme) themes[mode] = scopedTheme;
}
const configs = modes
  .map((mode) => ({ mode, entity: entities[mode], theme: themes[mode] }))
  .filter((item) => item.entity);
if (configs.length) installDocks(configs.map((item) => ({ ...item, hass: resolveHass() })));

// 即使当前页面没有 ha-music 卡片，全局歌词悬浮窗也自动识别正在播放的播放器。
// 卡片加载后会复用同一个悬浮窗，并把卡片自己的歌词/主题同步过来。
function bootGlobalLyricDock() {
  const pref = loadLyricDockPref();
  if (pref?.enabled === false) return;
  installLyricDock({
    enabled: true,
    entity: pref?.entity || "",
    preferredEntity: pref?.entity || "",
    auto: true,
    source: "auto",
    theme: DEFAULT_THEME,
    hass: resolveHass(),
    lines: [],
    trackKey: "",
    status: "idle",
  });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootGlobalLyricDock, { once: true });
  } else {
    window.setTimeout(bootGlobalLyricDock, 0);
  }
}
