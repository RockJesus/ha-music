// HA Music —— 常量、主题、特性位、文案

export const CARD_VERSION = "2.2.3";
export const CARD_TYPE = "ha-music";
export const CARD_NAME = "HA Music";

// HA media_player 能力位（MediaPlayerEntityFeature）
export const FEATURES = {
  PAUSE: 1,
  SEEK: 2,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  PLAY_MEDIA: 512,
  VOLUME_STEP: 1024,
  SELECT_SOURCE: 2048,
  STOP: 4096,
  CLEAR_PLAYLIST: 8192,
  PLAY: 16384,
  SHUFFLE_SET: 32768,
  SELECT_SOUND_MODE: 65536,
  BROWSE_MEDIA: 131072,
  REPEAT_SET: 262144,
  GROUPING: 524288,
  SELECT: 1048576,
};

export const DEFAULT_LAYOUT = "adaptive";
export const DEFAULT_THEME = "cyber";
export const DEFAULT_COVER = "ambient";
export const DEFAULT_VISUALIZER = "bars";

export const LYRIC_SOURCES = {
  auto: { en: "Auto (QQ → NetEase → LRCLIB → Lyrics.ovh)", zh: "自动（QQ/网易云 → LRCLIB → Lyrics.ovh）" },
  qq: { en: "QQ Music", zh: "QQ 音乐" },
  wy: { en: "NetEase Cloud Music", zh: "网易云音乐" },
  lrclib: { en: "LRCLIB (online synced lyrics)", zh: "LRCLIB（在线同步歌词）" },
};

export const DEFAULT_LYRIC_SOURCE = "auto";

export const LAYOUTS = {
  adaptive: { en: "Adaptive", zh: "自适应" },
  full: { en: "Full", zh: "完整" },
  compact: { en: "Compact", zh: "紧凑" },
  mini: { en: "Mini", zh: "迷你" },
};

export const COVER_MODES = {
  ambient: { en: "Ambient blur", zh: "环境模糊" },
  art: { en: "Cover fill", zh: "封面铺满" },
  palette: { en: "Palette only", zh: "纯色彩" },
  none: { en: "Plain", zh: "无背景" },
};

export const VISUALIZERS = {
  bars: { en: "Live spectrum", zh: "实时频谱" },
  wave: { en: "Wave", zh: "波形" },
  orbit: { en: "Orbit", zh: "光环" },
  none: { en: "Off", zh: "关闭" },
};

export const THEMES = {
  aurora: {
    label: { en: "Aurora", zh: "极光" },
    accent: ["#2ee6c5", "#7b5cff"],
    base: "#050a12",
    glow: 1,
    grid: false,
  },
  cyber: {
    label: { en: "Cyberpunk", zh: "赛博朋克" },
    accent: ["#ff2fd0", "#22e6ff"],
    base: "#08030f",
    glow: 1.4,
    grid: true,
  },
  liquid: {
    label: { en: "Liquid Glass", zh: "液态玻璃" },
    accent: ["#a9d8ff", "#cdb6ff"],
    base: "#090c16",
    glow: 0.8,
    grid: false,
    glass: true,
  },
  velvet: {
    label: { en: "Velvet", zh: "天鹅绒" },
    accent: ["#ff7a9c", "#a86bff"],
    base: "#0d050c",
    glow: 1.15,
    grid: false,
  },
  mono: {
    label: { en: "Monochrome", zh: "黑白" },
    accent: ["#e9ecf5", "#8d95a8"],
    base: "#08090c",
    glow: 0.4,
    grid: false,
  },
  sunset: {
    label: { en: "Sunset", zh: "日落" },
    accent: ["#ffa45c", "#ff4d8d"],
    base: "#120806",
    glow: 1.1,
    grid: false,
  },
  ocean: {
    label: { en: "Ocean", zh: "海洋" },
    accent: ["#39d0ff", "#2f7bff"],
    base: "#04101c",
    glow: 0.9,
    grid: false,
  },
};

const EN = {
  play: "Play",
  pause: "Pause",
  playing: "Now playing",
  paused: "Paused",
  idle: "Standby",
  off: "Off",
  buffering: "Buffering",
  previous: "Previous track",
  next: "Next track",
  volume: "Volume",
  mute: "Mute",
  unmute: "Unmute",
  shuffle: "Shuffle",
  repeat: "Repeat",
  repeatAll: "Repeat all",
  repeatOne: "Repeat one",
  repeatOff: "Repeat off",
  source: "Source",
  soundMode: "Sound mode",
  queue: "Current playlist",
  library: "Library",
  assistant: "Music Assistant",
  playlists: "Playlists",
  playlistsEmpty: "No playlists found",
  playlistEmpty: "This playlist is empty or unavailable in Music Assistant",
  maPlayerRequired: "Playlists need a Music Assistant player",
  playlistUnavailable: "Unavailable",
  playingPlaylist: "Playing",
  openAssistant: "Open Music Assistant",
  more: "More info",
  power: "Power",
  group: "Group",
  groupLeave: "Leave group",
  loading: "Loading…",
  queueEmpty: "Queue is empty",
  queueLimited: "Could not load the full queue. Install the Music Assistant add-on (or Mass Queue integration), or open Music Assistant for every track.",
  browseFailed: "Media library is unavailable",
  noMedia: "Nothing is playing",
  unknownArtist: "Unknown artist",
  noTitle: "No title",
  close: "Close",
  back: "Back",
  track: "Track",
  album: "Album",
  volumeEntityMissing: "Volume entity unavailable",
  seek: "Seek",
  remaining: "Toggle remaining time",
  lyrics: "Lyrics",
  lyricsLoading: "Matching lyrics…",
  lyricsNone: "No lyrics found",
  lyricsError: "Lyrics unavailable",
  lyricsRetry: "Retry",
  lyricsOffset: "Lyric timing offset",
  lyricsInstrumental: "Instrumental · no lyrics",
};

const ZH = {
  play: "播放",
  pause: "暂停",
  playing: "正在播放",
  paused: "已暂停",
  idle: "待机",
  off: "已关闭",
  buffering: "缓冲中",
  previous: "上一首",
  next: "下一首",
  volume: "音量",
  mute: "静音",
  unmute: "取消静音",
  shuffle: "随机播放",
  repeat: "循环",
  repeatAll: "列表循环",
  repeatOne: "单曲循环",
  repeatOff: "关闭循环",
  source: "音源",
  soundMode: "声音模式",
  queue: "当前播放列表",
  library: "媒体库",
  assistant: "Music Assistant",
  playlists: "播放列表",
  playlistsEmpty: "没有找到播放列表",
  playlistEmpty: "该歌单为空或曲目在 Music Assistant 中不可用",
  maPlayerRequired: "当前播放器不是 Music Assistant 播放器，请先切换到 MA 播放器",
  playlistUnavailable: "不可用",
  playingPlaylist: "开始播放",
  openAssistant: "打开 Music Assistant",
  more: "更多信息",
  power: "开关",
  group: "分组",
  groupLeave: "退出分组",
  loading: "加载中…",
  queueEmpty: "播放队列为空",
  queueLimited: "未能读取完整队列；需安装 Music Assistant 加载项（或 Mass Queue 集成），或点右上角在 Music Assistant 查看全部曲目。",
  browseFailed: "媒体库暂不可用",
  noMedia: "当前没有播放内容",
  unknownArtist: "未知艺术家",
  noTitle: "未知曲目",
  close: "关闭",
  back: "返回",
  track: "曲目",
  album: "专辑",
  volumeEntityMissing: "音量实体不可用",
  seek: "进度",
  remaining: "切换剩余时间",
  lyrics: "歌词",
  lyricsLoading: "正在匹配歌词…",
  lyricsNone: "未找到歌词",
  lyricsError: "歌词暂不可用",
  lyricsRetry: "重试",
  lyricsOffset: "歌词时间偏移",
  lyricsInstrumental: "纯音乐 · 无歌词",
};

export function isChinese(language) {
  return /^zh/i.test(language || "");
}

export function translator(language) {
  const dict = isChinese(language) ? ZH : EN;
  return (key) => dict[key] ?? EN[key] ?? key;
}

export function optionLabel(options, value, language) {
  const item = options[value];
  if (!item) return value;
  return isChinese(language) ? item.zh : item.en;
}


const MEDIA_CLASS_LABELS = {
  playlist: { en: "Playlist", zh: "播放列表" },
  album: { en: "Album", zh: "专辑" },
  artist: { en: "Artist", zh: "艺术家" },
  track: { en: "Track", zh: "曲目" },
  music: { en: "Music", zh: "音乐" },
  video: { en: "Video", zh: "视频" },
  directory: { en: "Folder", zh: "文件夹" },
  image: { en: "Image", zh: "图片" },
  url: { en: "Link", zh: "链接" },
  app: { en: "App", zh: "应用" },
  genre: { en: "Genre", zh: "风格" },
};

export function mediaClassLabel(mediaClass, language) {
  if (!mediaClass) return "";
  const item = MEDIA_CLASS_LABELS[String(mediaClass).toLowerCase()];
  if (!item) return mediaClass;
  return isChinese(language) ? item.zh : item.en;
}
