const { WebSocket } = require("ws");
const _log = require("../../../functions/_log");
const _regex = require("../../../functions/_regex");

/**
 * @param {WebSocket} ws
 * @param {Buffer} ping 
 */

module.exports = (ws, ping) => {
    _log(2, `[WS] [SERVER] [WS] [PING]`);
    let p = Buffer.from(ping).toString("utf-8");
    if(!_regex.jsonreg().test(p)) ws.pong();
    p = JSON.parse(Buffer.from(ping).toString("utf-8"));
    ws.pong(JSON.stringify({type: "pong", start: (p.start || null), start_server: Date.now()}));
};