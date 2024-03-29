const c_j_ = require("../classes/twitch/j_");
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
    description: "Test command",
    arguments: [{ name: "message", required: false, options: [] }],
    /** @param {c_j_} j_ */
    exec: async (j_) => {
        j_.send(`Test VoHiYo $(message[1])`);
        j_.message.reply([...Array(100)].map((a, i) => `Test ${i} `).join(""));
    }
};