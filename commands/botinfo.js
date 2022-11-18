const uptime = require("../functions/uptime");
const _cleantime = require("../functions/_cleantime");
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
    exec: async (j_) => {
        let pingstart = Date.now();
        await j.client.ping().then(() => {
            let ping = (Date.now()-pingstart);

            j.send(2, j_, `[BOTINFO] Ping: ${_cleantime(ping, 5, 1).time.join(" ")}, Uptime: ${uptime().join(" and ")}, `
            +`Version: ${global.variables.vars.botversion()}, `
            +`(Last GitHub commit: ${global.variables.vars.botgitrepository()}/commit/${global.variables.vars.botgitcommitid()})`)
        })
    }
}