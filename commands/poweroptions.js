const _checkenv = require("../functions/_checkenv");
const _wf = require("../functions/_wf");
let j = require("../variables/j");

module.exports = {
    name: "poweroptions",
    id: "global_commands_poweroptions",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        switch (j_.message._.command){
            case "restart": {
                if(_checkenv(null, "OS", 0, "Windows_NT")){
                    j.send(2, j_, `Error: Restart not possible on windows, exiting process`);
                    setTimeout(() => {
                        process.exit(0);
                    }, 1000);
                } else {
                    j.files().startup.reconnect = true;
                    _wf(j.paths().startup, j.files().startup);
                    j.send(2, j_, `Attempting reconnect`)
                    setTimeout(() => {
                        require("child_process").execSync(`pm2 flush j && pm2 restart j`);                        
                    }, 1000);
                }

                break;
            }

            default: {
                j.send(2, j_, `Error: Command defined but not found OhNo`);
            }
        }
    }
}