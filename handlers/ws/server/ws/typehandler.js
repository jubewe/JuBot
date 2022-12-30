const { WebSocket } = require("ws");

/**
 * @param {WebSocket} ws
 * @param {object} message 
 */

module.exports = (ws, message) => {
    if(!["login"].includes(message.type) && !ws._settings.logged_in) ws.send2("not logged in", 400);
    let ws_types = require("./types/_");
    if(!ws_types[message.type]) {console.log("no type"); return;}
    ws_types[message.type].exec(ws, message);
};