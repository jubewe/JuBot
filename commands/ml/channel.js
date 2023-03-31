const j_ = require("../classes/j_");
let j = require("../variables/j");
const _returnerr = require("../..//functions/_returnerr");
const whisperMessage = require("oberknecht-client/lib/parser/WHISPER.Message");
const _url = require("../../functions/_url");
const mlapirequestopts = require("../../functions/mlapirequestopts");
const mlrequest = require("../../functions/mlrequest");

module.exports = {
    name: "channel",
    /** @param {j_} response */
    exec: async (response) => {
        let _lookupchannel = (response.messageArguments[1] ?? response.channelID);
        if (!_lookupchannel) return response.reply(`Error: No channel provided`);

        await j.client.getuser(_lookupchannel)
            .then(u => {
                _lookupchannel = u;

                mlrequest(mlapirequestopts(`/modlookup/channel/${_lookupchannel.id}`), (e, r) => {
                    if (e) return response.reply(`Error: Could not get channel from Modlookup: ${_returnerr(e)}`);

                    let dat = r.data;

                    response.reply(`Found ${dat.num} (tracked) mods in ${_lookupchannel.login}`);
                    // + `${_lookupchannel.login}${response instanceof whisperMessage
                    //     ? `: ${add.slice(0, j.config.twitch.dm.max_tracker_num).join(", ")}`
                    //     + `${add.length > j.config.twitch.dm.max_tracker_num ? ` (First ${j.config.twitch.dm.max_tracker_num})` : ""}` : ""} `
                    // + `${(response.channel_?.linksInCommands == 1 ? _url(`/modlookup/channel/${_lookupchannel.id}`) : "")}`);
                })
            });

    },
    _tests: ["jubewe"]
};
