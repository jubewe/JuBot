const { WebSocket } = require("ws");

module.exports = class j_WebSocket extends WebSocket {
    static send2(data, status, type) {
      let d = {};
      if(data.data) d = data; else d.data = data;
      if(!d.status) d.status = (status ?? 200);
      if(!d.type) d.type = (type ?? this._lastmessage.type ?? null);
  
      this.send(JSON.stringify(d));
    };
};