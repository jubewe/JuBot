let j = require("../../../../variables/j");
let j_WebSocket = j.modules.j_WebSocket;
const _log = require("../../../../functions/_log");
const _regex = require("../../../../functions/_regex");
const _stackname = require("../../../../functions/_stackname");

/**
 * @param {j_WebSocket} ws
 * @param {Buffer} message 
 */

module.exports = (ws, message) => {
    if(!message || message.length == 0) return;
    let m = Buffer.from(message).toString("utf-8");
    _log(0, `[WS] [SERVER] [WS] [MESSAGE] \n\t${m}`);
    if(!_regex.jsonreg().test(m)) return;
    m = JSON.parse(Buffer.from(message).toString("utf-8"));
    ws._lastmessage = m;

    if(!m.type) return;

    require("./typehandler")(ws, m);
};