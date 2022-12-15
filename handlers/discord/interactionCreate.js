const { Interaction } = require("discordjs13.11.0");
const _log = require("../../functions/_log");
const _regex = require("../../functions/_regex");
const _staticspacer = require("../../functions/_staticspacer");
const { j_api_headeradmin } = require("../../variables/vars");

/**
 * @param {Interaction} interactionCreate 
 */

module.exports = (interactionCreate) => {
    let j = require("../../variables/j");
    // console.log(interactionCreate);
    if(j.files().discord.clientguilds.logguilds.includes(interactionCreate.guild.id)){
        _log(0, `${_staticspacer(1, `interactionCreate`)} ${_staticspacer(1, interactionCreate.guild.name)} ${_staticspacer(1, interactionCreate.member.user.tag)}: ${interactionCreate.customId}`);
    };
    if(interactionCreate.type === "MESSAGE_COMPONENT" && interactionCreate.customId && _regex.jsonreg().test(interactionCreate.customId)){
        let i = JSON.parse(interactionCreate.customId);
        if(!i.type) return;
        switch (i.type){
            case "delete": {
                try {
                    interactionCreate.message.delete().catch();
                    if(i.id){
                        interactionCreate.channel.messages.cache.get(i.id).delete().catch();
                    }
                } catch(e){}
                break;
            }
            case "apierror_delete": {
                let reqopts = {headers:j_api_headeradmin(), method: "GET"};
                j.modules.request(j.urls().api.__url("errors", "GET"), reqopts, (e, r) => {
                    if(e) return;
                    reqopts.method = "PATCH";
                    reqopts.headers.data = r.body.replace(new RegExp(`\n\".*${interactionCreate.message.embeds[0].description}\"`, "gi"), "");
                    j.modules.request(j.urls().api.__url("errors", "PATCH"), reqopts, (e, r) => {
                        console.log(e || r.body);
                    })
                })
                try {
                    interactionCreate.message.delete().catch();
                    if(i.id){
                        interactionCreate.channel.messages.cache.get(i.id).delete().catch();
                    };
                } catch(e){}
                break;
            }
        }
    };
};