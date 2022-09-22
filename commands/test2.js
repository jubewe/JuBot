let j = require("../variables/j");

module.exports = {
    name: "test2",
    id: "global_commands_test2",
    aliases: [],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: 1000,
    cooldown_user: 5000,
    exec: async () => {
        j = require("../variables/j");

        j.send(2, null, `Test 2`);
    }
}