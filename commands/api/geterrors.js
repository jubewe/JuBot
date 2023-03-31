const geterrors = require("../../functions/api/geterrors");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "api_geterrors",
    id: "global_commands_api_geterrors",
    aliases: [],
    state: 1,
    add_version: "0.1.8",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        geterrors()
            .then(e => {
                j_.send(`Cached ${(e.data.split("\n").length - 1).toFixed(0)} Errors`);
            })
            .catch(e => {
                j_.send(`Error: Could not get errors: ${_returnerr(e)}`);
            })
    }
};