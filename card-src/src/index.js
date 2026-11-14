// 打包入口：注册卡片与可视化编辑器
import "./ha-music-card.js";
import "./ha-music-editor.js";
import { installDock } from "./dock.js";

// 同一个 bundle 既可作为 Lovelace 资源，也可作为全局模块加载。
// 只有 URL 显式带 dock=1 时才注入顶部胶囊和右下角悬浮按钮，避免普通资源加载时出现悬浮层。
const moduleUrl = new URL(import.meta.url);
if (moduleUrl.searchParams.get("dock") === "1") {
  installDock({
    path: moduleUrl.searchParams.get("dock_path") || undefined,
    top: moduleUrl.searchParams.get("dock_top") !== "0",
    fab: moduleUrl.searchParams.get("dock_fab") !== "0",
  });
}
