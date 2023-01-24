const { MessageButton, MessageActionRow, Message } = require("discordjs13.11.0");
const { discord } = require("../../_");
const replacevariables = require("../replacevariables");

/**
 * @param {object} j_ 
 * @param {Message} response 
 * @param {number} sendopt 
 * @param {string} sendmessage 
 * @param {boolean} sendmulti 
 * @param {boolean} sendreplacer 
 * @param {array} components 
 * @param {array} files 
 * @param {array} attachments 
 */

async function send_(j_, response, sendopt, sendmessage, sendmulti, sendreplacer, components, files, attachments){
    return new Promise(async (resolve, reject) => {
        if(typeof sendopt !== "number" && !(sendmessage ?? undefined)){
            sendmessage = sendopt;
            sendopt = 2;
        };
        sendopt = (sendopt ?? 2);
        // if(typeof sendmessage === "string") message.channel.send(sendmessage);
        // if(typeof sendmessage === "object") if(!Array.isArray(sendmessage)) sendmessage = [sendmessage]; message.channel.send({embeds: sendmessage});
        if(sendreplacer){
            sendmessage = await replacevariables(j_, sendmessage)
        };
        switch (sendopt){
            case 0: {
                response.channel.send(sendmessage)
                .then(resolve).catch(reject);
                break;
            }
    
            case 1: {
                response.author.send(sendmessage)
                .then(resolve).catch(reject);
                break;
            }
    
            case 2: {
                if(typeof sendmessage === "string") sendmessage = discord.messageembed((j_.message._.comand ?? null), sendmessage);
                sendmessage = [sendmessage];
                let messageopts = {embeds: sendmessage, allowedMentions: {repliedUser: false}};
                if((components ?? undefined)) messageopts.components = components;
                if((attachments ?? undefined)) messageopts.attachments = attachments;
                if((files ?? undefined)) messageopts.files = files;
                
                messageopts.components = [new MessageActionRow({
                    components: [
                        new MessageButton({
                            customId: JSON.stringify({id:(response.id ?? null), type: "delete"}),
                            label: "Delete",
                            emoji: "🗑",
                            style: "DANGER"
                        })
                    ]
                })];
                response.reply(messageopts)
                .then(resolve)
                .catch(() => {
                    response.channel.send(messageopts)
                    .then(resolve).catch(reject);
                })
                break;
            }
        }
    });
};

module.exports = send_;