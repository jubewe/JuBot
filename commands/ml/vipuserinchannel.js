const j_ = require("../classes/j_");
const viplookup = require("../functions/viplookup");
const _returnerr = require("../functions/_returnerr");
const j = require("../variables/j");

module.exports = {
    name: "vipuserinchannel",
    // aliases: ["vc", "vipcheck"],
    /** @param {j_} response */
    exec: async (response) => {
        let user = (response.messageArguments[1] ?? response.userstate.id);
        let channel = (response.messageArguments[2] ?? response.userstate.id);
        
        viplookup.userinchannel(user, channel)
        .then(u => {
            response.reply(u.message2 ?? u.message);
        })
        .catch(e => {
            response.reply(`Error: ${_returnerr(e)}`);
        });
    }
};