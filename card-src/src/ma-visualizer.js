// MA 实时频谱：直连 Music Assistant 的 MilkDrop Visualizer 中继，
// 拿服务端解码出的真实 PCM 波形驱动音柱。
// 令牌只存在卡片配置里，绝不写进代码或仓库。

const FFT_SIZE = 1024;
const BIN_COUNT = FFT_SIZE / 2;

const hann = (() => {
  const w = new Float32Array(FFT_SIZE);
  for (let i = 0; i < FFT_SIZE; i += 1) {
    w[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (FFT_SIZE - 1));
  }
  return w;
})();

// 把用户填的地址规整成中继的 WebSocket 地址。
// 支持 http(s)://host:port、ws(s)://host:port 或裸 host:port，路径前缀会保留（ingress 场景）。
export function normalizeMaVisUrl(input) {
  let raw = String(input || "").trim();
  if (!raw) return "";
  if (!/^(wss?|https?):\/\//i.test(raw)) raw = `http://${raw}`;
  let url = raw.replace(/\/+$/, "");
  if (/^https:/i.test(url)) url = `wss:${url.slice(6)}`;
  else if (/^http:/i.test(url)) url = `ws:${url.slice(5)}`;
  if (!/\/milkdrop_visualizer$/i.test(url)) url = `${url}/milkdrop_visualizer`;
  return url;
}

function fftMagnitudes(wave) {
  const re = new Float32Array(FFT_SIZE);
  const im = new Float32Array(FFT_SIZE);
  for (let i = 0; i < FFT_SIZE; i += 1) re[i] = (wave[i] || 0) * hann[i];
  for (let i = 1, j = 0; i < FFT_SIZE; i += 1) {
    let bit = FFT_SIZE >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      const t = re[i];
      re[i] = re[j];
      re[j] = t;
      const u = im[i];
      im[i] = im[j];
      im[j] = u;
    }
  }
  for (let len = 2; len <= FFT_SIZE; len <<= 1) {
    const step = (2 * Math.PI) / len;
    const half = len >> 1;
    for (let i = 0; i < FFT_SIZE; i += len) {
      for (let k = 0; k < half; k += 1) {
        const ang = step * k;
        const wr = Math.cos(ang);
        const wi = -Math.sin(ang);
        const a = i + k;
        const b = a + half;
        const xr = re[b] * wr - im[b] * wi;
        const xi = re[b] * wi + im[b] * wr;
        re[b] = re[a] - xr;
        im[b] = im[a] - xi;
        re[a] += xr;
        im[a] += xi;
      }
    }
  }
  const mag = new Float32Array(BIN_COUNT);
  const norm = 1 / (FFT_SIZE / 2);
  for (let k = 0; k < BIN_COUNT; k += 1) {
    mag[k] = Math.hypot(re[k], im[k]) * norm;
  }
  return mag;
}

let cacheWave = null;
let cacheMag = null;

function magnitudesFor(wave) {
  if (cacheWave !== wave) {
    cacheMag = fftMagnitudes(wave);
    cacheWave = wave;
  }
  return cacheMag;
}

function bandDb(mag, sampleRate, fLow, fHigh) {
  const nyquist = sampleRate / 2;
  const lo = Math.max(1, Math.floor((fLow / nyquist) * BIN_COUNT));
  const hi = Math.min(BIN_COUNT - 1, Math.ceil((fHigh / nyquist) * BIN_COUNT));
  if (hi < lo) return -100;
  let sum = 0;
  for (let k = lo; k <= hi; k += 1) sum += mag[k] * mag[k];
  const rms = Math.sqrt(sum / (hi - lo + 1));
  return 20 * Math.log10(rms + 1e-7);
}

// 实测这份中继的波形：低频约 -19dB、中频 -33dB、高频可到 -80dB。
// 高频天然衰减，按柱子位置补一段倾斜增益后再落到 -86..-20dB 的可视区间，
// 否则右半边永远是一条贴地的线。
function dbToLevel(db, tiltDb) {
  return Math.max(0, Math.min(0.94, (db + tiltDb + 88) / 80));
}

// 波形 → 与柱子数量对齐的频段能量 + 三频段包络
export function waveTargets(wave, count, sampleRate, pulse = 0) {
  const rate = sampleRate >= 8000 ? sampleRate : 48000;
  const mag = magnitudesFor(wave);
  const nyquist = rate / 2;
  const fMin = 45;
  const fMax = Math.min(12000, nyquist - 1);
  const bins = Math.max(8, Math.min(160, Number(count) || 48));
  const bars = new Array(bins);
  let peak = 0;
  for (let i = 0; i < bins; i += 1) {
    const ratioLo = i / bins;
    const ratioHi = (i + 1) / bins;
    const f0 = fMin * Math.pow(fMax / fMin, ratioLo);
    const f1 = fMin * Math.pow(fMax / fMin, ratioHi);
    // 越靠高频补得越多，同时稍微压住低频，避免低频那半边永远顶满。
    const level = Math.min(
      0.94,
      dbToLevel(bandDb(mag, rate, f0, f1), ratioLo * 14 - 3) +
        pulse * (i < bins / 3 ? 0.12 : 0.03)
    );
    bars[i] = level;
    if (level > peak) peak = level;
  }
  const low = dbToLevel(bandDb(mag, rate, 40, 250), -2);
  const mid = dbToLevel(bandDb(mag, rate, 250, 2000), 4.5);
  const high = dbToLevel(bandDb(mag, rate, 2000, Math.min(12000, nyquist - 1)), 11);
  return {
    bars,
    bands: [
      Math.min(1, low + pulse * 0.18),
      Math.min(1, mid),
      Math.min(1, high),
    ],
    peak,
  };
}

function decodeWave(buffer) {
  const bytes = new Uint8Array(buffer);
  if (bytes.length < 9 + 64 || bytes[0] !== 22) return null;
  const len = bytes.length - 9;
  const wave = new Float32Array(FFT_SIZE);
  const copy = Math.min(FFT_SIZE, len);
  // 波形通常就是 1024 点；不足时前补零，多出时取尾部最新片段。
  const start = len > FFT_SIZE ? len - FFT_SIZE : 0;
  for (let i = 0; i < copy; i += 1) {
    wave[i] = (bytes[9 + start + i] - 128) / 128;
  }
  return wave;
}

export class MaVisualizer {
  constructor({ url, token, onWave, onBeat, onState }) {
    this.url = url;
    this.token = token;
    this.onWave = onWave;
    this.onBeat = onBeat;
    this.onState = onState;
    this.ws = null;
    this.closed = false;
    this.retry = 0;
    this.timer = null;
    this.lastAt = 0;
  }

  connect() {
    if (this.closed || !this.url || !this.token) return;
    if (typeof WebSocket === "undefined") return;
    this._clearTimer();
    let socket;
    try {
      socket = new WebSocket(this.url);
    } catch {
      this._scheduleRetry();
      return;
    }
    socket.binaryType = "arraybuffer";
    this.ws = socket;
    socket.onopen = () => {
      this.retry = 0;
      try {
        socket.send(JSON.stringify({ type: "auth", token: this.token }));
      } catch {
        /* 忽略 */
      }
    };
    socket.onmessage = (event) => this._handle(event.data);
    socket.onerror = () => {
      /* onclose 里统一处理 */
    };
    socket.onclose = () => {
      this.ws = null;
      this.onState?.("offline", null);
      this._scheduleRetry();
    };
  }

  close() {
    this.closed = true;
    this._clearTimer();
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        /* 忽略 */
      }
      this.ws = null;
    }
  }

  _clearTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
  }

  _scheduleRetry() {
    if (this.closed) return;
    this._clearTimer();
    const delay = Math.min(30000, 1200 * Math.pow(1.8, this.retry));
    this.retry = Math.min(8, this.retry + 1);
    this.timer = setTimeout(() => this.connect(), delay);
  }

  _handle(data) {
    if (typeof data === "string") {
      let msg;
      try {
        msg = JSON.parse(data);
      } catch {
        return;
      }
      const type = msg?.type || "";
      if (type === "auth_ok") this.onState?.("online", msg);
      else if (type === "stream/start") this.onState?.("start", msg);
      else if (type === "stream/clear" || type === "stream/end") this.onState?.("stop", msg);
      return;
    }
    if (!(data instanceof ArrayBuffer) || data.byteLength < 9) return;
    const view = new Uint8Array(data);
    const kind = view[0];
    if (kind === 22) {
      // 中继按音频块推送，实测可达 300+ 帧/秒；只按 30fps 取最新的帧，
      // 省掉多余的解码和 FFT，视觉上没有区别。
      const now = Date.now();
      if (now - (this._lastWaveAt || 0) < 28) return;
      this._lastWaveAt = now;
      const wave = decodeWave(data);
      if (wave) {
        this.lastAt = now;
        this.onWave?.(wave);
      }
    } else if (kind === 17) {
      const flags = view[9] || 0;
      this.onBeat?.(Boolean(flags & 1));
    }
  }
}
