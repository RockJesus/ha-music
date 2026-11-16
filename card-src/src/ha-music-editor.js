import { LitElement, html, css, nothing } from "lit";
import {
  THEMES,
  LAYOUTS,
  COVER_MODES,
  VISUALIZERS,
  LYRIC_SOURCES,
  DEFAULT_LYRIC_SOURCE,
  isChinese,
} from "./const.js";
import { normalizeDockModes, normalizeDockEntities, normalizeDockThemes } from "./dock.js";

function fireConfigChanged(node, config) {
  node.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config },
      bubbles: true,
      composed: true,
    })
  );
}

class HaMusicEditor extends LitElement {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .wrap {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 4px 0 10px;
        font-family: var(
          --paper-font-common-base_-_font-family,
          "PingFang SC",
          -apple-system,
          "Segoe UI",
          Roboto,
          sans-serif
        );
      }
      .section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .section-title {
        font-size: 11px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }
      .field {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .label {
        font-size: 12px;
        color: var(--primary-text-color);
      }
      .hint {
        font-size: 11px;
        color: var(--secondary-text-color);
        line-height: 1.45;
      }
      select,
      input[type="text"],
      input[type="color"] {
        width: 100%;
        box-sizing: border-box;
        padding: 8px 10px;
        border-radius: 8px;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        font-family: inherit;
      }
      input[type="color"] {
        padding: 2px;
        height: 36px;
      }
      .switch-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        min-height: 40px;
        padding: 4px 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }
      .entity-row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .dock-row {
        display: grid;
        grid-template-columns: 112px minmax(0, 1fr);
        align-items: center;
        gap: 8px;
      }
      .dock-row .check {
        min-height: 36px;
      }
      .dock-row ha-entity-picker {
        min-width: 0;
      }
      .dock-right {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }
      .dock-theme {
        flex: 0 0 105px;
        min-width: 0;
      }
      .entity-row ha-entity-picker {
        flex: 1 1 auto;
        min-width: 0;
      }
      .mini-btn {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        background: transparent;
        color: var(--primary-text-color);
        border-radius: 8px;
        padding: 6px 10px;
        font-size: 12px;
        cursor: pointer;
        font-family: inherit;
        white-space: nowrap;
      }
      .mini-btn:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }
      .add {
        align-self: flex-start;
      }
      .grid2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .check {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--primary-text-color);
      }
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
        margin: 0;
        accent-color: var(--primary-color, #2ee6c5);
      }
      .mini-btn {
        min-height: 36px;
      }
      select,
      input[type="text"],
      input[type="color"] {
        min-height: 40px;
      }
      @media (pointer: coarse) {
        .mini-btn {
          min-height: 44px;
          padding: 8px 14px;
        }
        select,
        input[type="text"] {
          min-height: 46px;
        }
        .switch-row {
          min-height: 48px;
        }
        input[type="checkbox"] {
          width: 24px;
          height: 24px;
        }
      }
    `;
  }

  constructor() {
    super();
    this._config = {};
    this._lang = "en";
    this._pendingEntity = false;
  }

  setConfig(config) {
    // 旧配置里可能残留编辑器早先加出来的空实体行；展示前先过滤，避免
    // 重新打开编辑器时一直看到一条空的“设备”。
    const entities = Array.isArray(config?.entities)
      ? config.entities.filter((item) => typeof item === "string" && item.trim())
      : undefined;
    this._config = { ...config, ...(entities ? { entities } : {}) };
  }

  willUpdate() {
    // 首次渲染前同步语言；放在 updated() 里赋值不会触发重渲染，会导致
    // 中文 HA 第一次打开编辑器时整页仍是英文标签。
    const lang = this.hass?.language || this._lang;
    if (lang !== this._lang) this._lang = lang;
  }

  get _zh() {
    return isChinese(this._lang || this.hass?.language);
  }

  _update(patch) {
    const next = { ...this._config, ...patch };
    Object.keys(next).forEach((key) => {
      if (next[key] === undefined) delete next[key];
    });
    this._config = next;
    fireConfigChanged(this, next);
  }

  _optionLabel(item) {
    return this._zh ? item.zh : item.en;
  }

  _dockModes() {
    return normalizeDockModes(this._config?.dock);
  }

  _dockEntities() {
    return normalizeDockEntities(this._config?.dock_entities);
  }

  _dockThemes() {
    return normalizeDockThemes(this._config?.dock_themes);
  }

  _setDockTheme(mode, value) {
    const themes = { ...this._dockThemes() };
    if (value) themes[mode] = value;
    else delete themes[mode];
    this._update({ dock_themes: themes, dock_edited: Date.now() });
  }

  _mainEntity() {
    const list = this._entities();
    return list[0] || this._config?.entity || "";
  }

  _toggleDock(mode, checked) {
    const modes = this._dockModes();
    const entities = this._dockEntities();
    let next;
    if (checked) {
      next = modes.includes(mode) ? modes : [...modes, mode];
      if (!entities[mode] && this._mainEntity()) entities[mode] = this._mainEntity();
    } else {
      next = modes.filter((item) => item !== mode);
    }
    this._update({
      dock: next.length ? next : "none",
      dock_entities: entities,
      dock_edited: Date.now(),
    });
  }

  _setDockEntity(mode, value) {
    const entities = { ...this._dockEntities(), [mode]: value || "" };
    if (!entities[mode]) delete entities[mode];
    this._update({ dock_entities: entities, dock_edited: Date.now() });
  }

  _entities() {
    if (Array.isArray(this._config.entities) && this._config.entities.length) {
      return this._config.entities;
    }
    return [];
  }

  _setEntity(index, value) {
    const list = this._entities();
    if (!list.length) {
      this._update({ entity: value || undefined });
      return;
    }
    const next = [...list];
    next[index] = value;
    this._update({ entities: next });
  }

  _addEntity() {
    if (this._pendingEntity) return;
    // 先只显示一条待选行，选到实体后再写 config；避免用户直接关掉编辑器
    // 时把空字符串写进 entities，重新打开一直挂着一条空行。
    this._pendingEntity = true;
    this.requestUpdate();
  }

  _commitPendingEntity(value) {
    const entity = String(value || "").trim();
    this._pendingEntity = false;
    if (!entity) {
      this.requestUpdate();
      return;
    }
    const list = this._entities();
    if (list.length) {
      this._update({ entities: [...list, entity] });
      return;
    }
    const first = String(this._config?.entity || "").trim();
    this._update({
      entity: undefined,
      entities: first ? [first, entity] : [entity],
    });
  }

  _cancelPendingEntity() {
    this._pendingEntity = false;
    this.requestUpdate();
  }

  _removeEntity(index) {
    const list = this._entities().filter((_, i) => i !== index);
    if (list.length <= 1) {
      this._update({ entity: list[0] || undefined, entities: undefined });
      return;
    }
    this._update({ entities: list });
  }

  render() {
    const config = this._config || {};
    const list = this._entities();
    const dockModes = this._dockModes();
    const dockEntities = this._dockEntities();

    const picker = (value, onValue, placeholder) => html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${value || ""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${false}
        .label=${placeholder}
        @value-changed=${(event) => {
          event.stopPropagation();
          onValue(event.detail?.value ?? "");
        }}
      ></ha-entity-picker>
    `;

    return html`
      <div class="wrap">
        <div class="section">
          <div class="section-title">${this._zh ? "播放器" : "Player"}</div>
          ${list.length
            ? list.map(
                (value, index) => html`
                  <div class="entity-row">
                    ${picker(
                      value,
                      (next) => this._setEntity(index, next),
                      index === 0 ? (this._zh ? "播放器" : "Player") : this._zh ? "设备" : "Player"
                    )}
                    <button
                      class="mini-btn"
                      @click=${() => this._removeEntity(index)}
                      title=${this._zh ? "移除" : "Remove"}
                    >
                      ${this._zh ? "移除" : "Remove"}
                    </button>
                  </div>
                `
              )
            : html`<div class="entity-row">
                ${picker(
                  config.entity || "",
                  (next) => this._setEntity(0, next),
                  this._zh ? "播放器" : "Player"
                )}
              </div>`}
          ${this._pendingEntity
            ? html`<div class="entity-row">
                ${picker(
                  "",
                  (next) => this._commitPendingEntity(next),
                  this._zh ? "选择要添加的播放器" : "Pick a player to add"
                )}
                <button class="mini-btn" @click=${() => this._cancelPendingEntity()}>
                  ${this._zh ? "取消" : "Cancel"}
                </button>
              </div>`
            : nothing}
          <button class="mini-btn add" @click=${() => this._addEntity()}>
            ${this._zh ? "＋ 添加播放器" : "＋ Add player"}
          </button>
          ${list.length
            ? html`<div class="hint">
                ${this._zh
                  ? "多设备模式：卡片顶部会出现设备切换标签。"
                  : "Multi-player mode adds switching chips on top of the card."}
              </div>`
            : nothing}
        </div>

        <div class="section">
          <div class="section-title">${this._zh ? "外观" : "Appearance"}</div>
          <div class="grid2">
            <label class="field">
              <span class="label">${this._zh ? "布局" : "Layout"}</span>
              <select
                .value=${config.layout || "adaptive"}
                @change=${(e) => this._update({ layout: e.target.value })}
              >
                ${Object.keys(LAYOUTS).map(
                  (key) =>
                    html`<option value=${key} ?selected=${config.layout === key}>
                      ${this._optionLabel(LAYOUTS[key])}
                    </option>`
                )}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh ? "主题" : "Theme"}</span>
              <select
                .value=${config.theme || "aurora"}
                @change=${(e) => this._update({ theme: e.target.value })}
              >
                ${Object.keys(THEMES).map(
                  (key) =>
                    html`<option value=${key} ?selected=${config.theme === key}>
                      ${this._optionLabel(THEMES[key].label)}
                    </option>`
                )}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh ? "背景" : "Background"}</span>
              <select
                .value=${config.cover || "ambient"}
                @change=${(e) => this._update({ cover: e.target.value })}
              >
                ${Object.keys(COVER_MODES).map(
                  (key) =>
                    html`<option value=${key} ?selected=${config.cover === key}>
                      ${this._optionLabel(COVER_MODES[key])}
                    </option>`
                )}
              </select>
            </label>
            <label class="field">
              <span class="label">${this._zh ? "频谱动效" : "Visualizer"}</span>
              <select
                .value=${config.visualizer || "bars"}
                @change=${(e) => this._update({ visualizer: e.target.value })}
              >
                ${Object.keys(VISUALIZERS).map(
                  (key) =>
                    html`<option value=${key} ?selected=${config.visualizer === key}>
                      ${this._optionLabel(VISUALIZERS[key])}
                    </option>`
                )}
              </select>
            </label>
          </div>
          <label class="field">
            <span class="label">
              ${this._zh ? "频谱歌单 JSON（可选）" : "Spectrum playlist JSON (optional)"}
            </span>
            <input
              type="url"
              .value=${config.spectrum_playlist_url || ""}
              placeholder="/local/community/ha-music/playlist.json"
              @change=${(e) =>
                this._update({
                  spectrum_playlist_url: e.target.value.trim() || undefined,
                })}
            />
          </label>
          <label class="field">
            <span class="label">
              ${this._zh ? "频谱音频源（可选）" : "Spectrum audio URL (optional)"}
            </span>
            <input
              type="url"
              .value=${config.spectrum_audio_url || ""}
              placeholder="https://…/track.mp3"
              @change=${(e) =>
                this._update({
                  spectrum_audio_url: e.target.value.trim() || undefined,
                })}
            />
          </label>
          <div class="hint">
            ${this._zh
              ? "歌单 JSON 支持 tracks/audios 数组，卡片按当前曲目的 QQ mid、歌名和歌手匹配 url；匹配不到再回退单曲音频源，最后回退逐帧律动。音频源必须允许跨域。"
              : "Playlist JSON may contain tracks/audios arrays; the card matches the current QQ mid, title and artist to choose its url. If no match, it falls back to the single audio URL, then to procedural motion. Audio sources must allow CORS."}
          </div>
          <label class="field">
            <span class="label">${this._zh ? "标题（留空用实体名称）" : "Title (optional)"}</span>
            <input
              type="text"
              .value=${config.name || ""}
              @input=${(e) => this._update({ name: e.target.value || undefined })}
            />
          </label>
          <label class="field">
            <span class="label">${this._zh ? "强调色覆盖（可选）" : "Accent override (optional)"}</span>
            <input
              type="color"
              .value=${config.accent || "#2ee6c5"}
              @input=${(e) => this._update({ accent: e.target.value })}
            />
          </label>
          <div class="check">
            <input
              type="checkbox"
              id="ha-music-palette"
              .checked=${config.palette !== false}
              @change=${(e) => this._update({ palette: e.target.checked })}
            />
            <label for="ha-music-palette">
              ${this._zh ? "从封面自动取色" : "Extract colors from cover art"}
            </label>
          </div>
        </div>

        <div class="section">
          <div class="section-title">${this._zh ? "显示内容" : "Visible elements"}</div>
          <label class="field">
            <span class="label">
              ${this._zh
                ? "音量实体（可选，用于无音量能力的播放器）"
                : "Volume entity (optional)"}
            </span>
            <input
              type="text"
              .value=${config.volume_entity || ""}
              placeholder="number.volume / media_player.amp"
              @change=${(e) => this._update({ volume_entity: e.target.value || undefined })}
            />
          </label>
          ${this._switch(
            this._zh ? "显示音量条" : "Show volume",
            config.show_volume !== false,
            (checked) => this._update({ show_volume: checked })
          )}
          ${this._switch(
            this._zh ? "显示音源选择" : "Show source picker",
            config.show_source !== false,
            (checked) => this._update({ show_source: checked })
          )}
          ${this._switch(
            this._zh ? "显示播放队列" : "Show queue",
            config.show_queue !== false,
            (checked) => this._update({ show_queue: checked })
          )}
          ${this._switch(
            this._zh ? "显示媒体库浏览" : "Show media browser",
            config.show_library !== false,
            (checked) => this._update({ show_library: checked })
          )}
          ${this._switch(
            this._zh ? "自动识别歌词" : "Auto lyrics",
            config.show_lyrics !== false,
            (checked) => this._update({ show_lyrics: checked })
          )}
          <label class="field">
            <span class="label">${this._zh ? "歌词源" : "Lyrics source"}</span>
            <select
              .value=${config.lyrics_source || DEFAULT_LYRIC_SOURCE}
              @change=${(e) => this._update({ lyrics_source: e.target.value })}
            >
              ${Object.keys(LYRIC_SOURCES).map(
                (key) =>
                  html`<option value=${key} ?selected=${(config.lyrics_source || DEFAULT_LYRIC_SOURCE) === key}>
                    ${this._optionLabel(LYRIC_SOURCES[key])}
                  </option>`
              )}
            </select>
            <span class="hint">
              ${this._zh
                ? "默认自动：先用 QQ 音乐匹配，失败再回退网易云。"
                : "Auto: try QQ Music first, then fall back to NetEase."}
            </span>
          </label>
          ${this._switch(
            this._zh ? "全局歌词悬浮窗（单行 / 长按拖动）" : "Global floating lyric (one line, long-press drag)",
            config.floating_lyrics !== false,
            (checked) =>
              this._update({
                floating_lyrics: checked,
                floating_lyrics_edited: Date.now(),
              })
          )}
          ${this._switch(
            this._zh ? "显示分组信息" : "Show group info",
            config.show_group !== false,
            (checked) => this._update({ show_group: checked })
          )}
          ${this._switch(
            this._zh ? "显示 Music Assistant 歌单入口" : "Show Music Assistant playlists",
            config.music_assistant !== false,
            (checked) =>
              this._update({
                music_assistant:
                  checked
                    ? typeof config.music_assistant === "string"
                      ? config.music_assistant
                      : true
                    : false,
              })
          )}
          <label class="field">
            <span class="label">
              ${this._zh ? "MA 面板地址（留空自动，仅供抽屉内跳转）" : "MA panel URL (optional)"}
            </span>
            <input
              type="text"
              .value=${typeof config.music_assistant === "string" ? config.music_assistant : ""}
              .disabled=${config.music_assistant === false}
              placeholder="/music-assistant"
              @input=${(e) =>
                this._update({
                  music_assistant: e.target.value.trim() || true,
                })}
            />
            <span class="hint">
              ${this._zh
                ? "留空自动读取 HA 面板路径；歌单入口本身不依赖此项"
                : "Leave empty to auto-detect the HA panel path"}
            </span>
          </label>
          <div class="section-title">${this._zh ? "全局迷你播放器" : "Global mini players"}</div>
          <div class="hint">
            ${this._zh
              ? "三个位置可以同时启用，也可以分别选择各自的播放器实体；单击播放/暂停，双击折叠或展开。顶部只可左右移动、侧边栏只可上下移动；右下角长按后可任意拖动，但不能进入侧边栏和顶栏。"
              : "Each position can use its own entity; click to play/pause, double-click to fold, long-press to drag."}
          </div>
          ${(() => {
            const dockThemes = this._dockThemes();
            return [
            ["top", this._zh ? "顶部播放器" : "Top bar"],
            ["sidebar", this._zh ? "侧边栏播放器" : "Sidebar"],
            ["fab", this._zh ? "右下角播放器" : "Bottom-right"],
          ].map(([mode, label]) => {
            const enabled = dockModes.includes(mode);
            const entity = dockEntities[mode] || this._mainEntity();
            const theme = dockThemes[mode] || this._config.theme || "aurora";
            return html`
              <div class="dock-row">
                <label class="check">
                  <input
                    type="checkbox"
                    .checked=${enabled}
                    @change=${(e) => this._toggleDock(mode, e.target.checked)}
                  />
                  <span>${label}</span>
                </label>
                <div class="dock-right">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${entity || ""}
                    .includeDomains=${["media_player"]}
                    .allowCustomEntity=${false}
                    .label=${this._zh ? "播放器实体" : "Player entity"}
                    @value-changed=${(event) => {
                      event.stopPropagation();
                      this._setDockEntity(mode, event.detail?.value ?? "");
                    }}
                  ></ha-entity-picker>
                  ${enabled
                    ? html`<select
                        class="dock-theme"
                        .value=${theme}
                        @change=${(e) => this._setDockTheme(mode, e.target.value)}
                        title=${this._zh ? "播放器主题" : "Player theme"}
                      >
                        ${Object.keys(THEMES).map(
                          (key) =>
                            html`<option value=${key} ?selected=${theme === key}>
                              ${this._optionLabel(THEMES[key].label)}
                            </option>`
                        )}
                      </select>`
                    : nothing}
                </div>
              </div>
            `;
            });
          })()}
        </div>
      </div>
    `;
  }

  _switch(label, checked, onChange) {
    return html`<label class="switch-row">
      <span class="label">${label}</span>
      <input
        type="checkbox"
        .checked=${checked}
        @change=${(e) => onChange(e.target.checked)}
      />
    </label>`;
  }
}

if (!customElements.get("ha-music-editor")) {
  customElements.define("ha-music-editor", HaMusicEditor);
}
