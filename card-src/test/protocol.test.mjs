import assert from "node:assert/strict";
import test from "node:test";
import { PROTOCOL_VERSION, protocolMatches, protocolErrorText, queueEventCompatible } from "../src/protocol.js";

test("protocol version matches backend contract", () => {
  assert.equal(PROTOCOL_VERSION, 1);
});

test("protocolMatches accepts only the current version", () => {
  assert.equal(protocolMatches({ protocol: 1 }), true);
  assert.equal(protocolMatches({ protocol: "1" }), true);
  assert.equal(protocolMatches({ protocol: 0 }), false);
  assert.equal(protocolMatches({}), false);
  assert.equal(protocolMatches(null), false);
});

test("protocol error text follows HA language", () => {
  assert.match(protocolErrorText("zh-Hans"), /协议/);
  assert.match(protocolErrorText("en"), /protocol/i);
});

test("queueEventCompatible 放行完整队列并拦截真正的协议错误", () => {
  assert.equal(
    queueEventCompatible({ type: "queue", protocol: 1, queue_id: "q", items: [] }),
    true
  );
  assert.equal(
    queueEventCompatible({ type: "queue", queue_id: "q", items: [] }),
    true
  );
  assert.equal(
    queueEventCompatible({ type: "queue", protocol: 2, queue_id: "q", items: [] }),
    false
  );
  assert.equal(queueEventCompatible(1), false);
});
