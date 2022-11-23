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
    exec: async (j_) => {
        let title = (j_.message._.msg.split(";")[0]);
        let choices = (j_.message._.msg.split(";"));
        choices.shift();

        if(!title || !choices) return j_.send(`Error: No title or choices specified`);

        j.functions().twitch.createpoll(j_.message.channel.id, title, choices.map(a => {return {"title":a}}))
        .then(p => {
            console.log(p);

            j_.send(`Successfully created poll`);
        })
        .catch(e => {
            console.error(e);
            j_.send(`Error: Could not create poll: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
        })
    }
};