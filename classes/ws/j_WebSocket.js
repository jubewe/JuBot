const ReconnectingWebSocket = require("reconnecting-websocket");

class j_WebSocket extends ReconnectingWebSocket {
  static send2(data, status, type) {
    let d = {};
    if (data.data) d = data; else d.data = data;
    if (!d.status) d.status = (status ?? 200);
    if (!d.type) d.type = (type ?? this._lastmessage.type ?? null);

    this.send(JSON.stringify(d));
  };
};

module.exports = j_WebSocket;