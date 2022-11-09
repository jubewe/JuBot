const createclip = require("../functions/createclip");
const getuser = require("../functions/getuser");
const _pixelize = require("../functions/_pixelize");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _usertoken = require("../functions/_usertoken");
let j = require("../variables/j");

module.exports = {
    name: "clip",
    id: "global_commands_clip",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 10000,
    cooldown_user: 5000,
    exec: async (j_, j) => {
        let clipchan = j_.message._.chan;
        
        if(j_.message._.msg.split(" ")[1]){
            if(_regex.usernamereg().test(j_.message._.msg.split(" ")[1])){
                clipchan = j_.message._.msg.split(" ")[1];
            } else {
                j.send(2, j_, `Error: arg 1 does not match channel regex`);
                return;
            }
        }

        getuser(1, clipchan)
        .then(u => {
            _usertoken(0, j_.message.userstate.id, null, true)
            .then(t => {
                if(t.scopes.includes("clips:edit")){
                    createclip(u[1], t.token, t.client_id)
                    .then(c => {
                        j.send(2, j_, `Successfully created clip in ${_pixelize(clipchan)} (${u[1]}): ${c.edit_url.split("/edit")[0]}`);
                    })
                    .catch(e => {
                        j.send(2, j_, `Error: Could not create clip: ${(e.message ? e.message : "")}`);
                    })
                } else {
                    j.send(2, j_, `Error: Missing scope clips:edit`);
                }
            })
            .catch(e => {
                if(j_.message.userstate.ismod || j_.message.userstate.id === j_.message.channel.id){
                    createclip(u[1])
                    .then(c => {
                        j.send(2, j_, `Successfully created clip in ${_pixelize(clipchan)} (${u[1]}): ${c.edit_url.split("/edit")[0]}`);
                    })
                    .catch(e => {
                        j.send(2, j_, `Error: Could not create clip: ${(e.message ? e.message : "")}`);
                    })
                } else {
                    j.send(2, j_, `Error: Could not get user token: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                }
            })
        })
        .catch(e => {
            j.send(2, j_, `Error: Could not recieve channelid: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
        })
    }
}