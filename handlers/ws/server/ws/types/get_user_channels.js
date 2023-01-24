const BaseType = require("./BaseType");
let j = require("../../../../../variables/j");
const getmodlookupuser = require("../../../../../functions/other/getmodlookupuser");
const get_user_channels = require("../../../../../functions/ws/get_user_channels");
const files = require("../../../../../variables/files");
const j_WebSocket = j.modules.j_WebSocket;

module.exports = class BaseTypeMessage extends BaseType {
    static name = "get_user_channels";
    static id = "ws_server_ws_get_user_channels";
    static state = 1;
    static add_version = "0.2.0";
    static add_user = "jubewe";
    static permission = j.c().perm.default;
    static cooldown = 30000;
    static cooldown_user = 15000;
    /**
     * @param {j_WebSocket} ws 
     * @param {string} message 
     */
    static exec = async (ws, message) => {
        get_user_channels(ws._settings.oauth_token.login)
        .then(uc => {
            uc.channels = uc.modlookup;
            uc.channels = uc.channels.filter(a => {
                return files.clientchannels.channels.includes(a[0]);
            });
            ws.send2({channels: uc.channels, modlookup: uc.modlookup}, 200);
        })
        .catch(e => {
            console.error(e);
            ws.send2(e, 400);
        })
    }
};