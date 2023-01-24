const _pixelize = require("../functions/_pixelize");
const _wf = require("../functions/_wf");
let j = require("../variables/j");
const paths = require("../variables/paths");

module.exports = {
    name: "unview",
    id: "global_commands_unview",
    aliases: [],
    state: 1,
    add_version: "0.0.9",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let unviewchan = j_.message._.args()[0].toLowerCase();
            if(j.files().clientchannels.viewchannels.includes(unviewchan)){
                if(j.viewclient){
                    j.viewclient.part(unviewchan);
                }
                j.files().clientchannels.viewchannels.splice(j.files().clientchannels.viewchannels.indexOf(unviewchan, 1));

                // _wf(paths.clientchannels, channels);

                j_.send(`Successfully stopped viewing ${_pixelize(unviewchan)}`);
            } else {
                j_.send(`Error: Not viewing ${_pixelize(unviewchan)}`);
            }
        } else {
            j_.send(`Error: No channel given`);
        }
    }
}