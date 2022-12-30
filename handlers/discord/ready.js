const _log = require("../../functions/_log");
const _pickrandom = require("../../functions/_pickrandom");
const _rf = require("../../functions/_rf");
const _stackname = require("../../functions/_stackname");
const _staticspacer = require("../../functions/_staticspacer");
let j = require("../../variables/j");
const paths = require("../../variables/paths");
const { Routes } = require("discordjs13.11.0/node_modules/discord-api-types/v9");

module.exports = () => {
    let j = require("../../variables/j");

    _log(1, `${_staticspacer(1, `ready`)} ${_stackname("discord", "connect")[3]} Successful`);
    
    let activities = [
        ["Nothing", {url: "https://twitch.tv/Jubewe", type: "PLAYING"}], 
        ["Ju", {url: "https://twitch.tv/Jubewe", type: "LISTENING"}],
        ["lol", {url: "https://twitch.tv/Jubewe", type: "STREAMING"}],
        ["lol", {url: "https://twitch.tv/Ju_B0T", type: "STREAMING"}]
    ]

    function setRandomActivity(){
        j.dc.client.user.setActivity(..._pickrandom(activities, 1));
    };

    j.dc.client.channels.fetch(j.c().discord.channelids.errors).then(ch => {
        ch.sendTyping();
    });

    let discord_commands = require(paths.discord.commands);
    let application_commands = Object.keys(discord_commands).map(a => {
        let r = {name:discord_commands[a].name, description:discord_commands[a].description ?? "None"};
        // r.type = "1";
        if(discord_commands[a].arguments && discord_commands[a].arguments.length > 0) r.options = discord_commands[a].arguments;
        return r;
        // https://discord.js.org/#/docs/discord.js/13.11.0/typedef/ApplicationCommandOption -> Choices
    });
    application_commands.forEach(a => {
        if(a.options){
            let options2 = [];
            a.options.forEach(b => {
                if(b.required) options2.unshift(b); else options2.push(b);
            });
            a.options = options2;
        }
    });
    console.log(application_commands[2].options);
    (async () => {
        try {
            // await j.dc.rest.put(Routes.applicationCommands(j.env().DC_APPLICATIONID), {body: application_commands})
            j.c().discord.guilds.forEach(async guild => {
                await j.dc.rest.put(Routes.applicationGuildCommands(j.env().DC_APPLICATIONID, guild), {body: application_commands})
            });
        } catch(e){
            console.error(e);
        }
    })();

    setInterval(setRandomActivity, j.c().intervals.discord.randomactivity);
};