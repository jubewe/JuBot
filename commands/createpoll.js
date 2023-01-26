const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "createpoll",
    id: "global_commands_createpoll",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    arguments: [{name:"polloptions",required:true,options:["title and choices seperated by ;"]}],
    exec: async (j_) => {
        let title = (j_.message._.msg.split(";")[0].split(j_.message._.prefix + j_.message._.command)[1]);
        let choices = (j_.message._.msg.split(";"));
        choices.shift();

        console.log(title);
        console.log(choices);

        if(!title || !choices) return j_.send(`Error: No title or choices specified`);

        j.functions().twitch.createpoll(j_.message.channel.id, title, choices)
        .then(p => {
            j_.send(`Successfully created poll`);
        })
        .catch(e => {
            console.error(e);
            j_.send(`Error: Could not create poll: ${e.error || _returnerr(e,0)} ${e.message || _returnerr(e,1)}`);
        })
    }
};