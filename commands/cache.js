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
    arguments: [{name:"option",required:true,options:["clear"]}],
    exec: async (j_) => {
        if(j_.message.messageArguments[0]){
            switch (j_.message.messageArguments[0]){
                case "clear": {
                    if(j_.message.messageArguments[1]){
                        let cachename = j_.message.messageArguments[1];
                        if(!cachename in j.c().cache.names) return j_.send(2, `Error: Invalid cache name`);
                        
                        if(j.paths()[cachename]){
                            _wf(j.paths()[cachename], {}, true)
                        } else {
                            j_.send(2, `Error: Path of cache not found`);
                        }
                        j_.send(2, `Successfully cleared cache`);
                    } else {
                        _wf(j.paths().cache, {}, true);
                        j_.send(2, `Successfully cleared cache`);
                    }

                    break;
                }

                default: {
                    j_.send(2, `Error: Option not found`);
                }
            }
        } else {
            j_.send(2, `Error: No option given`);
        }
    }
}