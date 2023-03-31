const whisperMessage = require("oberknecht-client/lib/parser/WHISPER.Message");
const j_ = require("../classes/j_");
const modlookup = require("../functions/modlookup");
const _returnerr = require("../functions/_returnerr");
const _url = require("../functions/_url");
const j = require("../variables/j");

module.exports = {
    name: "user",
    /** @param {j_} response */
    exec: async (response) => {
        let _lookupuser = (response.messageArguments[1] ?? response.senderUserID);
        if (!_lookupuser) return response.reply(`Error: No user provided`);
        await j.client.getuser(_lookupuser)
            .then(_lookupuser => {
                modlookup.user(_lookupuser.id)
                    .then(lookupuser => {
                        if (lookupuser.error) return response.reply(`Error: ${_returnerr(lookupuser, false)}`);

                        let add = Object.keys(lookupuser.channels).map(a => lookupuser.channels[a].name);
                        response.reply(`${_lookupuser.login} is mod in `
                            + `${add.length} (tracked) channels${(response instanceof whisperMessage
                                ? `: ${add.slice(0, j.config.twitch.dm.max_tracker_num).join(", ")}`
                                + `${add.length > j.config.twitch.dm.max_tracker_num ? ` (First ${j.config.twitch.dm.max_tracker_num})` : ""}` : "")} `
                            + `${(response.channel_?.linksInCommands == 1 ? _url(`/modlookup/user/${_lookupuser.id}`) : "")}`);
                    })
                    .catch(e => {
                        response.reply(`Errored: ${_returnerr(e)} PoroSad`);
                    });
            })
            .catch(e => {
                return response.reply(`Error: Invalid user provided: ${_returnerr(e)}`);
            });
    },
    _tests: ["jubewe"]
};