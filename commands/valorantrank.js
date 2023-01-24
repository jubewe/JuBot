const api_requestheaders = require("../functions/api/api_requestheaders");
const _channel = require("../functions/twitch/_channel");
let j = require("../variables/j");
const urls = require("../variables/urls");

module.exports = {
    name: "valorantrank",
    id: "global_commands_valorantrank",
    aliases: ["rank"],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    parameters: ["channel"],
    send_msg_nochan: true,
    cooldown: 3000,
    cooldown_user: 5000,
    exec: async (j_) => {
        _channel(0, j_.message.channel.id, "valoranttag")
        .then(valoranttag => {
            if(valoranttag){
                j.modules.request(`${urls.api.__url("valorantrank", "GET").replace(":riotid", valoranttag.split("#")[0]).replace(":tagline", valoranttag.split("#")[1])}`, {headers: {...api_requestheaders(), "force": (j_.message._.msg.includes("-force") && j_.message._.userperms._default ? true : false)}}, function(e, r){
                    if(e){
                        j_.send(2, `Error: Could not recieve rank`);
                    } else {
                        let dat = JSON.parse(r.body);

                        if(dat.status === 200){
                            j_.send(3, `${j_.message._.chan}'s Valorant Rank: ${dat.data.rank}`);
                        } else {
                            j_.send(2, `Valorant Rank Error: ${dat.data} (${dat.e})`);
                        }
                    }
                })
            } else {
                j_.send(2, `Error: No valoranttag set`);
            }
        })
    }
};