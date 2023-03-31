const createclip = require("../functions/twitch/actions/createclip");
const messageembed = require("../functions/discord/messageembed");
const getuser = require("../functions/twitch/getuser");
const _pixelize = require("../functions/_pixelize");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _usertoken = require("../functions/twitch/_usertoken");
let j = require("../variables/j");

module.exports = {
    name: "clip",
    id: "global_commands_clip",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    parameters: [],
    cooldown: 10000,
    cooldown_user: 5000,
    arguments: [{name:"clipchan",required:false,options:["clipchannel"]}],
    exec: async (j_) => {
        let clipchan = j_.message._.chan;
        let j = require("../variables/j")
        
        if(j_.message._.args()[0]){
            if(_regex.usernamereg().test(j_.message._.args()[0])){
                clipchan = j_.message._.args()[0];
            } else {
                return j_.send(2, `Error: Specified channel does not match channel regex`);
            }
        }

        if(!clipchan) return j_.send(2, `Error: No channel spcified`);

        getuser(1, clipchan)
        .then(u => {
            _usertoken(0, j_.message.userstate.id, null, false)
            .then(t => {
                if(!(t ?? false) || t.scopes.includes("clips:edit")){
                    t = t ?? {token: undefined, client_id: undefined};
                    createclip(u[1], t.token, t.client_id)
                    .then(c => {
                        j_.send(2, `Successfully created clip in ${_pixelize(clipchan)} (${u[1]}): ${c.edit_url.split("/edit")[0]}`);

                        if(j.files().channels.channels[u[1]] && j.files().channels.channels[u[1]].send_clips_to_discord && j.files().channels.channels[u[1]].discord_clipchannelid && u[1] == j_.message.channel.id){
                            j.dc.client.channels.fetch(j.files().channels.channels[u[1]].discord_clipchannelid)
                            .then(channel => {
                                channel.send(`${c.edit_url.split("/edit")[0]}`, {embeds: [messageembed("Clip", `Created by ${j_.message.userstate.username} (${j_.message.userstate.id}) in ${j_.message.channel.name} (${j_.message.channel.id})\n\n${c.edit_url.split("/edit")[0]}`)]})
                            })
                            .catch(e => {
                                console.error(e);
                            })
                        }
                    })
                    .catch(e => {
                        j_.send(2, `Error: Could not create clip: ${(e.message ? e.message : "")}`);
                    })
                } else {
                    j_.send(2, `Error: Missing scope clips:edit`);
                }
            })
            .catch(e => {
                j_.send(2, `Error: Could not get user token: ${_returnerr(e)}`);
            })
        })
        .catch(e => {
            j_.send(2, `Error: Could not recieve channelid: ${_returnerr(e)}`);
        })
    }
}