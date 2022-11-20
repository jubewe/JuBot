const _wf = require("../functions/_wf");
let j = require("../variables/j");

module.exports = {
    name: "cache",
    id: "global_commands_cache",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            switch (j_.message._.args()[0]){
                case "clear": {
                    if(j_.message._.args()[1]){
                        let cachename = j_.message._.args()[1];
                        if(!cachename in j.c().cache.names) return j.send(2, j_, `Error: Invalid cache name`);
                        
                        if(j.paths()[cachename]){
                            _wf(j.paths()[cachename], {})
                        } else {
                            j.send(2, j_, `Error: Path of cache not found`);
                        }
                        j.send(2, j_, `Successfully cleared cache`);
                    } else {
                        _wf(j.paths().cache, {});
                        j.send(2, j_, `Successfully cleared cache`);
                    }

                    break;
                }

                default: {
                    j.send(2, j_, `Error: Option not found`);
                }
            }
        } else {
            j.send(2, j_, `Error: No option given`);
        }
    }
}