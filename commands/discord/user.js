const getuser = require("../../functions/discord/getuser");
const { discord } = require("../../functions/_");
const _regex = require("../../functions/_regex");
let j = require("../../variables/j");

module.exports = {
    name: "user",
    id: "discord_global_commands_user",
    aliases: [],
    state: 1,
    add_version: "0.2.0",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        let user = j_.message.userstate.id;
        if(j_.message._.args()[0] && _regex.numregex().test(j_.message._.args()[0])) user = j_.message._.args()[0];
        getuser(1, user)
        .then(u => u[2])
        .then(u => {
            let uif = Object.keys(u).filter(a => {return (u[a] !== undefined && typeof u[a] !== "object")});
            let ui = `<@${u.id}>\n`;
            j_.send(discord.messageembed("Userinfo", ui, null, null, null, uif.map(a => {return {name:`${a.substring(0,1).toUpperCase()}${a.substring(1)}`, value:u[a].toString(), inline:true}}), null, {url:`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=100`}));
        })
        .catch(e => {
            console.error(e);
            j_.send(`Error: Could not get user\n${(e.message || e.msg || "<Other Internal Error>")}\n${e.stack || ""}`);
        })
    }
};