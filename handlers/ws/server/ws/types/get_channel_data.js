const BaseType = require("./BaseType");
let j = require("../../../../../variables/j");
const getmodlookupuser = require("../../../../../functions/other/getmodlookupuser");
const get_user_channels = require("../../../../../functions/ws/get_user_channels");
const files = require("../../../../../variables/files");
const j_WebSocket = j.modules.j_WebSocket;

module.exports = class BaseTypeMessage extends BaseType {
    static name = "get_channel_data";
    static id = "ws_server_ws_get_channel_data";
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
        
    }
};