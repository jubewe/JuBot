const uptime = require("../functions/twitch/uptime");
const _cleantime = require("../functions/_cleantime");
// const { j_: c_j_ } = require("../classes/classes").twitch

let j = require("../variables/j");
module.exports = {
    name: "botinfo",
    id: "global_commands_botinfo",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 30000,
    cooldown_user: 15000,
    /**
     * @param {} j_ 
     */
    exec: async (j_) => {
        let ping = (Date.now()-parseInt(j_.message.server.timestampRaw));
        
        j_.send(2, `[BOTINFO] Ping: ${_cleantime(ping, 4, 1).time.join("")}, Uptime: ${uptime().join(" and ")}, `
        +`Version: ${global.variables.vars.botversion()}, `
        +`(Last GitHub commit: ${global.variables.vars.botgitrepository()}/commit/${global.variables.vars.botgitcommitid()})`)
        // await j.client.ping()
        // .then(() => {
        //     // let ping = (Date.now()-pingstart);
        //     // Ping: ${_cleantime(ping, 5, 1).time.join(" ")}, 
        // });
    }
}