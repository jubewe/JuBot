const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "flush",
    id: "global_commands_flush",
    aliases: [],
    state: 1,
    add_version: "0.2.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        try {
            require("child_process").execSync("pm2 flush");
            j_.send("Successfully flushed logs");
        } catch(e){
            j_.send(`Error: Could not flush logs: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
        }
    }
};