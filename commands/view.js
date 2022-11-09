const _pixelize = require("../functions/_pixelize");
const _wf = require("../functions/_wf");
let j = require("../variables/j");
const paths = require("../variables/paths");

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
    exec: async (j_, j) => {
        let channels = j.files().clientchannels;

        if(j_.message._.args()[0]){
            let viewchan = j_.message._.args()[0].toLowerCase();
            if(!channels.viewchannels.includes(viewchan)){
                j_.viewclient.join(viewchan);
                channels.viewchannels.push(viewchan);
                _wf(paths.clientchannels, channels);
                j.send(2, j_, `Successfully started viewing ${_pixelize(viewchan)}`);
            } else {
                j.send(2, j_, `Error: Already viewing ${_pixelize(viewchan)}`)
            }
        } else {
            j.send(2, j_, `Error: No channel given`);
        }
    }
}