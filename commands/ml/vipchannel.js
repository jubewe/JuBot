const whisperMessage = require("oberknecht-client/lib/parser/WHISPER.Message");
const j_ = require("../classes/j_");
const viplookup = require("../functions/viplookup");
const _returnerr = require("../functions/_returnerr");
const j = require("../variables/j");
const _url = require("../functions/_url");

module.exports = {
    name: "vipchannel",
    /** @param {j_} response */
    exec: async (response) => {
        let _lookupchannel = (response.messageArguments[1] ?? response.channelID);
        if (!_lookupchannel) return response.reply(`Error: No channel provided`);
        _lookupchannel = await j.client.getuser(_lookupchannel);
        if (!_lookupchannel?.id) return response.reply(`Error: Invalid channel provided`);
        viplookup.channel(_lookupchannel.id)
            .then(lookupchannel => {
                if (lookupchannel.error) return response.reply(`Error: ${_returnerr(lookupchannel)}`);

                let add = Object.keys(lookupchannel.users).map(a => lookupchannel.users[a].name);
                response.reply(`Found ${add.length} (tracked) vips in `
                    + `${_lookupchannel.login}${response instanceof whisperMessage ?
                        `: ${add.slice(0, j.config.twitch.dm.max_tracker_num).join(", ")}`
                        + `${add.length > j.config.twitch.dm.max_tracker_num ? ` (First ${j.config.twitch.dm.max_tracker_num})` : ""}` : ""} `
                    + `${(response.channel_?.linksInCommands == 1 ? _url(`/viplookup/channel/${_lookupchannel.id}`) : "")}`);
            })
            .catch(e => {
                response.reply(`Errored: ${_returnerr(e)}`);
            });
    },
    _tests: ["jubewe"]
};