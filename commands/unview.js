const { _rf, _wf } = require("../functions/_");
const _pixelize = require("../functions/_pixelize");
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
    exec: async () => {
        j = require("../variables/j");
        let channels = _rf(paths.clientchannels, true);

        if(j.message._.args()[0]){
            let unviewchan = j.message._.args()[0].toLowerCase();
            if(channels.viewchannels.includes(unviewchan)){
                j.viewclient.part(unviewchan);
                channels.viewchannels.splice(channels.viewchannels.indexOf(unviewchan, 1));
                _wf(paths.clientchannels, channels);
                j.send(2, j, `Successfully stopped viewing ${_pixelize(unviewchan)}`);
            } else {
                j.send(2, j, `Error: Not viewing ${_pixelize(unviewchan)}`);
            }
        } else {
            j.send(2, j, `Error: No channel given`);
        }
    }
}