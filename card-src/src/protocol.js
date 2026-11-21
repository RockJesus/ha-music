// Wire protocol shared with ha_music_studio. Keep this value in sync with
// custom_components/ha_music_studio/protocol.py.
export const PROTOCOL_VERSION = 1;

export function protocolMatches(event) {
  return Number(event?.protocol) === PROTOCOL_VERSION;
}

export function protocolErrorText(language) {
  if (String(language || "").toLowerCase().startsWith("zh")) {
    return "后端协议不匹配，请更新 HA Music Studio";
  }
  return "Backend protocol mismatch. Update HA Music Studio.";
}

// 队列事件：订阅刚建立时，后端偶尔会先送一帧没有 protocol、但结构完整的队列快照。
// 这种缺省元数据不应触发“后端过期”提示，否则每次刷新页面首次打开队列都会误报。
export function queueEventCompatible(event) {
  if (protocolMatches(event)) return true;
  const missingProtocol = event?.protocol === undefined || event?.protocol === null;
  return (
    missingProtocol &&
    event?.type === "queue" &&
    Boolean(event.queue_id) &&
    Array.isArray(event.items)
  );
}
