let j = require("../variables/j");

module.exports = {
    name: "test",
    aliases: [],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        j.send(2, null, `Test`);
    }
}