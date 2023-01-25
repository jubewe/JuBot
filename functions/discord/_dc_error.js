const { MessageActionRow, MessageButton } = require("discordjs13.11.0");
const { discord } = require("../_");

async function _dc_error(channelid, error, response){
    try {
        let c = require("../../config.json");
        let j = require("../../variables/j");
        if(!c.connect.discord) return;
        response = (response ?? {});
        j.dc.client.channels.fetch((channelid ?? c.discord.channelids.errors))
        .then(ch => {
            let messageopts = {};
            // ${String(error.message || error).split("\n").map(a => {return encodeURI(a)}).join("\n")}
            messageopts.embeds = [discord.messageembed(undefined, `Error:\n\`\`\` ${error.message + "\n" + error.stack || error}\`\`\``)];
            messageopts.components = [new MessageActionRow({
                components: [
                    new MessageButton({
                        customId: JSON.stringify({id: (response.id ?? null), type: "apierror_delete"}),
                        label: "Delete",
                        emoji: "🗑",
                        style: "DANGER"
                    })
                ]
            })];
            ch.send(messageopts);
        })
        .catch(e => {})
    } catch(e){
        console.error(e);
    }
};

module.exports = _dc_error;