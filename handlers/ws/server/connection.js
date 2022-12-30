let j = require("../../../variables/j");
const _log = require("../../../functions/_log");
const _stackname = require("../../../functions/_stackname");
const { WebSocket } = require("ws");
const check_logged_in = require("../../../functions/ws/check_logged_in");
const heartbeat = require("./ws/heartbeat");

/**
 * @param {WebSocket} ws 
 */

module.exports = (ws) => {
    _log(0, `${_stackname("ws", "server", "connection")[3]}`);

    ws.send2 = require("../../../classes/ws/j_WebSocket").send2;
    ws._settings = {
        logged_in: false,
        username: undefined,
        password: undefined,
        oauth_token: {
            token: undefined,
            scopes: undefined,
            client_id: undefined,
            user_login: undefined,
            user_id: undefined,
            expires_in: undefined
        }
    };

    ws._data = {
        last_ping: -1,
        last_pong: -1
    };

    setTimeout(() => {
        // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
        if(!check_logged_in(ws)) ws.close(1010, JSON.stringify({type: "close", data: `did not login after ${j.c().timeouts.ws.server.ws.login} ms`}))
    }, j.c().timeouts.ws.server.ws.login);

    setInterval(() => {
        heartbeat(ws);
    }, j.c().intervals.ws.server.ws.heartbeat);

    ws.addListener("ping", (ping) => {require("../ws/ping")(ws, ping)});
    ws.addListener("pong", (pong) => {require("../ws/pong")(ws, pong)});
    ws.addListener("open", require("../ws/open"));
    ws.addListener("close", require("../ws/close"));
    ws.addListener("error", require("../ws/error"));
    ws.addListener("message", (message) => { require("./ws/message")(ws, (message instanceof Buffer ? message : Buffer.from(message, "utf-8"))) });
};