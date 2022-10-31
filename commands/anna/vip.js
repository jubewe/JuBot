const getuser = require("../../functions/getuser");
const _requestopts = require("../../functions/_requestopts");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "anna_vip",
    id: "global_commands_anna_vip",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.bothigh,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../../variables/j");

        if(j.message._.args()[0]){
            let user = j.message._.args()[0];
            let vipurl = ((j.message._.command == "vip" ? j.urls().twitch.vip.add : j.urls().twitch.vip.remove));
            getuser(1, user)
            .then(u => {
                j.modules.request(vipurl.url.replace(":broadcaster_id", j.env().T_USERID_ANNA).replace(":user_id", u[1]), _requestopts(vipurl.method, j.env().T_TOKEN_ANNA), (e, r) => {
                    if(e){
                        console.error(new Error(e));
                        j.send(2, j, `Error: ${e}`);
                    } else {
                        j.send(2, j, `Successfully executed request: ${r.body}`)
                    }
                })
            })
            .catch(e => {
                j.send(2, j, `Error: Could not get userid ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
            })
        } else {
            j.send(2, j, `Error: No user to ${j.message._.command} given`)
        }
    }
}