let j = require("../../variables/j");

module.exports = {
    name: "anna_test",
    id: "global_commands_anna_test",
    aliases: [],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.bothigh,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_, j) => {
        j.send(2, j_, `VoHiYo Test`);
    }
}