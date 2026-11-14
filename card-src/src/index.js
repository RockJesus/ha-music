// 打包入口：注册卡片与可视化编辑器
import "./ha-music-card.js";
import "./ha-music-editor.js";
import { installDock, loadDockPref, resolveHass } from "./dock.js";

// 同一个 bundle 既可作为 Lovelace 资源，也可作为全局模块加载。
// 迷你播放器的位置由卡片 `dock` 配置记忆到 localStorage；也可用模块 URL 强制指定：
//   ?dock=top|sidebar|fab&dock_entity=media_player.xxx
const moduleUrl = new URL(import.meta.url);
const queryMode = moduleUrl.searchParams.get("dock");
const pref = loadDockPref();
const mode = queryMode === "1" ? "top" : queryMode || pref?.mode;
const entity = moduleUrl.searchParams.get("dock_entity") || pref?.entity;

if (mode && mode !== "none" && entity) {
  installDock({ mode, entity, hass: resolveHass() });
}
