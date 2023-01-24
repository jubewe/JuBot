let j = require("../../../../variables/j");

module.exports = (ws) => {
    if(ws._data.last_ping > 0 && (Date.now()-ws._data.last_pong - Date.now()-ws._data.last_ping) > j.c().intervals.ws.server.ws.heartbeat+2000) return ws.close();
    ws._data.last_ping = Date.now();
    ws.ping(JSON.stringify({type: "ping", start: Date.now(), start_server: Date.now(), heartbeat: true}));
};