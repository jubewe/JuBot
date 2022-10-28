const createclip = require("../functions/createclip");
const getuser = require("../functions/getuser");
const _pixelize = require("../functions/_pixelize");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _usertoken = require("../functions/_usertoken");
const { c } = require("../variables/j");
let j = require("../variables/j");

module.exports = {
    name: "clip",
    id: "global_commands_clip",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 10000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        
        let clipchan = j.message._.chan;
        
        if(j.message._.msg.split(" ")[1]){
            if(_regex.usernamereg().test(j.message._.msg.split(" ")[1])){
                clipchan = j.message._.msg.split(" ")[1];
            } else {
                j.send(2, j, `Error: arg 1 does not match channel regex`);
                return;
            }
        }

        getuser(1, clipchan)
        .then(u => {
            _usertoken(0, j.message.userstate.id, null, true)
            .then(t => {
                if(t.scopes.includes("clips:edit")){
                    createclip(u[1], t.token, t.client_id)
                    .then(c => {
                        j.send(2, j, `Successfully created clip in ${_pixelize(clipchan)} (${u[1]}), Edit and publish at ${c.edit_url}`);
                    })
                    .catch(e => {
                        j.send(2, j, `Error: Could not create clip: ${(e.message ? e.message : "")}`);
                    })
                } else {
                    j.send(2, j, `Error: Missing scope clips:edit`);
                }
            })
            .catch(e => {
                j.send(2, j, `Error: Could not get user token: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
            })
        })
        .catch(e => {
            j.send(2, j, `Error: Could not recieve channelid: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
        })
    }
}