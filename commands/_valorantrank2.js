const { _channel } = require("../functions/_");
let j = require("../variables/j");
const urls = require("../variables/urls");

module.exports = {
    name: "valorantrank2",
    id: "global_commands_valorantrank2",
    aliases: ["rank2"],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 3000,
    cooldown_user: 5000,
    exec: async (j_, j) => {
        if(j_.message._.args()[0]){
            let valoranttag = j_.message._.args()[0];
            if(valoranttag.includes("#")){
                j.modules.request(`${urls.api.__url("valorantrank", "GET").replace(":riotid", valoranttag.split("#")[0]).replace(":tagline", valoranttag.split("#")[1])}`, {method: "GET"}, function(e, r){
                    if(e){
                        j.send(2, j_, `Error: Could not recieve rank`);
                    } else {
                        let dat = JSON. parse(r.body);

                        if(r.statusCode === 200){
                            j.send(2, j_, `${valoranttag}'s Valorant Rank: ${dat.data}`);
                        } else {
                            j.send(2, j_, `${valoranttag}'s Valorant Rank Error: ${dat.data} (${dat.e})`);
                        }
                    }
                })
            }
        }
    }
};