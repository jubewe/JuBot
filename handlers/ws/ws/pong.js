const { WebSocket } = require("ws");
const _log = require("../../../functions/_log");
const _regex = require("../../../functions/_regex");

/**
 * @param {WebSocket} ws
 * @param {Buffer} pong 
 */

module.exports = (ws, pong) => {
    _log(0, `[WS] [SERVER] [WS] [PONG]`);
    ws._data.last_pong = Date.now();
};