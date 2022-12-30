const { Interaction } = require("discordjs13.11.0");
const _log = require("../../functions/_log");
const _regex = require("../../functions/_regex");
const _staticspacer = require("../../functions/_staticspacer");
const { j_api_headeradmin } = require("../../variables/vars");

/**
 * @param {Interaction} response 
 */

module.exports = (response) => {
    let j = require("../../variables/j");
    // console.log(response);
    if(j.files().discord.clientguilds.logguilds.includes((response.guild && response.guild.id ? response.guild.id : (response.channel && response.channel.type == "DM" ? "DM" : null)))){
        _log(0, `${_staticspacer(1, `response`)} ${_staticspacer(1, response.guild.name)} ${_staticspacer(1, response.member.user.tag)}: ${response.customId}`);
    };
    switch (response.type){
        case "MESSAGE_COMPONENT": {
            if(response.customId && _regex.jsonreg().test(response.customId)){
                let i = JSON.parse(response.customId);
                if(!i.type) return;
                switch (i.type){
                    case "delete": {
                        try {
                            response.message.delete().catch();
                            if(i.id){
                                response.channel.messages.cache.get(i.id).delete().catch();
                            }
                        } catch(e){}
                        break;
                    }
                    case "apierror_delete": {
                        let reqopts = {headers:j_api_headeradmin(), method: "GET"};
                        j.modules.request(j.urls().api.__url("errors", "GET"), reqopts, (e, r) => {
                            if(e) return;
                            reqopts.method = "PATCH";
                            reqopts.headers.data = r.body.replace(new RegExp(`\n\".*${response.message.embeds[0].description}\"`, "gi"), "");
                            j.modules.request(j.urls().api.__url("errors", "PATCH"), reqopts, (e, r) => {
                                console.log(e || r.body);
                            })
                        })
                        try {
                            response.message.delete().catch();
                            if(i.id){
                                response.channel.messages.cache.get(i.id).delete().catch();
                            };
                        } catch(e){}
                        break;
                    }
                }
            }
            break;
        }

        case "APPLICATION_COMMAND": {
            require("./applicationcommand")(response);
            break;
        }
    }
};