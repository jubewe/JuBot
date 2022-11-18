let j = require("../variables/j");

module.exports = {
    name: "test",
    id: "global_commands_test",
    aliases: [],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 30000,
    cooldown_user: 45000,
    exec: async (j_) => {
        j.send(2, j_, `Test VoHiYo $(message[1])`, null, null, null, true);
    }
}