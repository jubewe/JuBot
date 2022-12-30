const BaseType = require("./BaseType");
let j = require("../../../../../variables/j");
const gettoken = require("../../../../../functions/twitch/gettoken");
const j_WebSocket = j.modules.j_WebSocket;
const admin_token = require("../../../../../functions/express/admin_token");
const _regex = require("../../../../../functions/_regex");
const decode = require("../../../../../functions/decode");

module.exports = class BaseTypeMessage extends BaseType {
    static name = "login";
    static id = "ws_server_ws_login";
    static state = 1;
    static add_version = "0.2.0";
    static add_user = "jubewe";
    static permission = j.c().perm.default;
    static cooldown = -1;
    static cooldown_user = -1;
    /**
     * @param {j_WebSocket} ws 
     * @param {string} message 
     */
    static exec = async (ws, message) => {
        let oauth_token = (message.data.oauth_token ?? undefined);
        if(_regex.numregex().test(oauth_token)) oauth_token = decode(oauth_token);
        let username = ((message.data.username ?? undefined) && _regex.numregex().test(message.data.username) ? decode(message.data.username) : null);
        let password = ((message.data.password ?? undefined) && _regex.numregex().test(message.data.password) ? decode(message.data.password) : null);

        if(username && password){
            await admin_token(0, username)
            .then(t => {
                ws._settings.username = username;
                ws._settings.password = password;

                oauth_token = t[1];
            })
            .catch(e => {
                return ws.send2(`could not get token by username`);
            })
        };
        
        if(oauth_token){
            gettoken(oauth_token)
            .then(t => {
                ws._settings.oauth_token = t;
                ws._settings.oauth_token.token = oauth_token;
                ws._settings.logged_in = true;
                ws.send2(`successfully logged in`, 200);
            })
            .catch(e => {
                console.error(e);
                ws.send2(`could not get token info: ${e.message}`, 400);
            })
        } else {
            ws.send2("invalid option, no oauth token found", 404);
        }
    }
};