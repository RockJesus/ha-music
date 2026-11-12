import { LitElement, html, css, nothing } from "lit";
import {
  THEMES,
  LAYOUTS,
  COVER_MODES,
  VISUALIZERS,
  isChinese,
} from "./const.js";

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
  }

  setConfig(config) {
    this._config = { ...config };
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
    const list = this._entities();
    if (list.length) {
      this._update({ entities: [...list, ""] });
      return;
    }
    const seed = this._config.entity
      ? [this._config.entity, ""]
      : ["", ""];
    this._update({ entities: seed, entity: undefined });
  }

  _removeEntity(index) {
    const list = this._entities().filter((_, i) => i !== index);
    if (list.length <= 1) {
      this._update({ entity: list[0] || undefined, entities: undefined });
      return;
    }
    this._update({ entities: list });
  }

  updated() {
    this._lang = this.hass?.language || this._lang;
  }

  render() {
    const config = this._config || {};
    const list = this._entities();

    const picker = (value, index, placeholder) => html`
      <ha-entity-picker
        .hass=${this.hass}
        .value=${value || ""}
        .includeDomains=${["media_player"]}
        .allowCustomEntity=${false}
        .label=${placeholder}
        @value-changed=${(event) => {
          event.stopPropagation();
          this._setEntity(index, event.detail?.value ?? "");
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
                    ${picker(value, index, index === 0 ? (this._zh ? "播放器" : "Player") : this._zh ? "设备" : "Player")}
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
                ${picker(config.entity || "", 0, this._zh ? "播放器" : "Player")}
              </div>`}
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
              placeholder="/music-assistant"
              @change=${(e) =>
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

customElements.define("ha-music-editor", HaMusicEditor);
