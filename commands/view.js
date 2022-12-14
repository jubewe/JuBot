const _pixelize = require("../functions/_pixelize");
let j = require("../variables/j");

module.exports = {
    name: "view",
    id: "global_commands_view",
    aliases: [],
    state: 1,
    add_version: "0.0.9",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let viewchan = j_.message._.args()[0].toLowerCase();
            if(!j.files().clientchannels.viewchannels.includes(viewchan)){
                if(j.viewclient){
                    j.viewclient.join(viewchan);
                }
                j.files().clientchannels.viewchannels.push(viewchan);

                // _wf(paths.clientchannels, j.files().clientchannels);

                j_.send(`Successfully started viewing ${_pixelize(viewchan)}`);
            } else {
                j_.send(`Error: Already viewing ${_pixelize(viewchan)}`)
            }
        } else {
            j_.send(`Error: No channel given`);
        }
    }
}