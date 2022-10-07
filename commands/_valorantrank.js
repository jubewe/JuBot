const request = require("request");
const _rf = require("../functions/_rf");
let j = require("../variables/j");
const paths = require("../variables/paths");
const urls = require("../variables/urls");

module.exports = {
    name: "valorantrank",
    id: "global_commands_valorantrank",
    aliases: ["rank"],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 15000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        let valorant = _rf(paths.valorant, true);
        if(valorant.channels[j.message.channel.id]){
            let valorantchan = valorant.channels[j.message.channel.id];
            request(urls.valorank.replace(":riotid", valorantchan.split("#")[0]).replace(":tagline", valorantchan.split("#")[1]), {method: "GET"}, function(e, r){
                if(e){
                    j.send(2, null, `Error: Could not recieve rank`);
                } else {
                    let dat = JSON.parse(r.body);

                    if(dat.status === 200){
                        j.send(2, null, `${j.message._.chan} Valorant Rank: ${dat.data}`);
                    } else {
                        j.send(2, null, `${j.message._.chan} Valorant Rank Error: ${dat.data} (${dat.e})`);
                    }
                }
            })
        }
    }
}