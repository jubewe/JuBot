const uptime = require("../functions/twitch/uptime");
const _cleantime = require("../functions/_cleantime");
const _returnerr = require("../functions/_returnerr");
const { j_: cl_j_ } = require("../classes/classes").twitch;

let j = require("../variables/j");
module.exports = {
    name: "botinfo",
    id: "global_commands_botinfo",
    aliases: [],
    state: 1,
    add_version: "0.0.6",
    add_user: "jubewe",
    permission: j.c().perm.default,
    /** @param {cl_j_} j_ */
    exec: async (j_) => {
        j.client.ping()
        .then(ping => {
            j_.send(`[BOTINFO] Ping: ${_cleantime(ping, 4, 1).time.join("")}, Uptime: ${uptime().join(" and ")}, Version: ${global.variables.vars.botversion()}, `
            +`(Last GitHub commit: ${global.variables.vars.botgitrepository()}/commit/${global.variables.vars.botgitcommitid()})`)
        })
        .catch(e => {
            j_.send(`PoroSad error on pinging: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
        });
    }
}