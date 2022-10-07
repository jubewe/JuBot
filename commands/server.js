const request = require("request");
const _cleantime = require("../functions/_cleantime");
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

        request(urls.botinfo, {method: "GET", headers: j.vars().j_api_headeradmin()}, function(e, r){
            if(e){
                console.error(new Error(e));
                j.send(2, null, `Error: Could not recieve serverinfo`);
            } else {
                let dat = JSON.parse(r.body).data;
                j.send(2, null, `Serverinfo: Uptime: ${_cleantime(dat.pi.uptime, 4, "auto").time}, Free Memory: ${Math.floor(dat.pi.memory.free/1048576)} mb, ` +
                `Bots: JuBot: ${dat.bots.jubot.data.connections > 0 ? "connected" : "disconnected"} ${dat.bots.jubot.data.uptime ? `(${_cleantime(dat.bots.jubot.data.uptime, 4, "auto").time})` : ""}), ` +
                `Patrick: ${dat.bots.patrick.data.connections > 0 ? "connected" : "disconnected"}  ${dat.bots.patrick.data.uptime ? `(${_cleantime(dat.bots.patrick.data.uptime, 4, "auto").time})` : ""})`);
            }
        })
    }
}