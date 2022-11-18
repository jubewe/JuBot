const api_requestheaders = require("../functions/api/api_requestheaders");
const _splitafter = require("../functions/_splitafter");
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
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let valoranttag = _splitafter(j_.message._.msg, 1);
            if(valoranttag.includes("#")){
                j.modules.request(`${urls.api.__url("valorantrank", "GET").replace(":riotid", valoranttag.split("#")[0]).replace(":tagline", valoranttag.split("#")[1])}`, {method: "GET", headers: api_requestheaders()}, (e, r) => {
                    if(e){
                        j.send(2, j_, `Error: Could not recieve rank`);
                    } else {
                        let dat = JSON.parse(r.body);

                        if(dat.status === 200){
                            j.send(3, j_, `${valoranttag}'s Valorant Rank: ${dat.data.rank}`);
                        } else {
                            j.send(2, j_, `Valorant Rank Error: ${dat.data} (${dat.e})`);
                        }
                    }
                });
            }
        }
    }
};