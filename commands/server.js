const request = require("request");
const _cleantime = require("../functions/_cleantime");
const _percentage = require("../functions/_percentage");
let j = require("../variables/j");
const urls = require("../variables/urls");

module.exports = {
    name: "server",
    id: "global_commands_server",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        request(`${urls.api.__url("serverinfo", "GET")}`, {method: "GET", headers: j.vars().j_api_headeradmin()}, (e, r) => {
            if(e){
                console.error(new Error(e));
                j.send(2, j, `Error: Could not recieve serverinfo`);
            } else {
                let dat = JSON.parse(r.body).data;
                function botinfoparser(botname){
                    return `${dat.bots[botname] && dat.bots[botname].data.connections > 0 ? "connected" : "disconnected"} ${dat.bots[botname] && dat.bots[botname].data.uptime ? `(${_cleantime(dat.bots[botname].data.uptime, 4, 2).time.join(" and ")})` : ""})`
                };
                j.send(2, j, `Serverinfo: Uptime: ${_cleantime(dat.pi.uptime, 4, 2).time.join(" and ")}; Memory Usage: ${(_percentage(dat.pi.memory.total, dat.pi.memory.free, null, 0))}% (${Math.round(dat.pi.memory.used/1048576)} / ${Math.round(dat.pi.memory.total/1048576)} mb); \n` +
                `Bots: JuBot [TWITCH]: ${botinfoparser("jubot")} <|> Patrick [TWITCH]: ${botinfoparser("patrick")} <|> Phil [TWITCH, DISCORD]: ${botinfoparser("phil")}`);
            }
        })
    }
}