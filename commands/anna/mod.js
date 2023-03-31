const getuser = require("../../functions/twitch/getuser");
const _requestopts = require("../../functions/_requestopts");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");
let c_j_ = require("../../classes/twitch/j_");
const whisperMessage = require("oberknecht-client/lib/parser/WHISPER.Message");

module.exports = {
    name: "anna_mod",
    id: "global_commands_anna_mod",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.bothigh,
    cooldown: -1,
    cooldown_user: -1,
    /** @param {c_j_} j_ @param {whisperMessage} response */
    exec: async (j_, response) => {
        if(response.messageParts[1]){
            let user = response.messageParts[1];
            let modurl = ((j_.message._.command == "mod" ? j.urls().twitch.moderator.add : j.urls().twitch.moderator.remove));
            getuser(1, user)
            .then(u => {
                j.modules.request(modurl.url.replace(":broadcaster_id", j.env().T_USERID_ANNA).replace(":user_id", u[1]), _requestopts(modurl.method, j.env().T_TOKEN_ANNA), (e, r) => {
                    if(e){
                        j_.send(2, `Error: ${_returnerr(e)}`);
                    } else {
                        j_.send(2, `Successfully executed request: ${r.body}`)
                    }
                })
            })
            .catch(e => {
                j_.send(2, `Error: Could not get userid ${_returnerr(e)}`);
            })
        } else {
            j_.send(2, `Error: No user to ${j_.message._.command} given`)
        }
    }
}