const mlapirequestopts = require("../../functions/mlapirequestopts");
const mlrequest = require("../../functions/mlrequest");
const _returnerr = require("../../functions/_returnerr");
const j_ = require("../classes/j_");
const j = require("../variables/j");

module.exports = {
    name: "channels",
    /** @param {j_} response */
    exec: async (response) => {
        mlrequest(mlapirequestopts("/modlookup/channels"), (e, r) => {
            if(e) return response.reply(`Error: Could not get channels from ML: ${_returnerr(e)}`);

            let dat = r.data;
            response.reply(`VoHiYo Found ${dat.num} mod-channels in the database`);
        });
    }
};