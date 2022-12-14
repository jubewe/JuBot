const _log = require("../../functions/_log");
const _pickrandom = require("../../functions/_pickrandom");
const _stackname = require("../../functions/_stackname");

module.exports = () => {
    let j = require("../../variables/j");

    _log(1, `${_stackname("discord", "connect")[3]} Successful`);
    
    let activities = [
        ["Nothing", {url: "https://twitch.tv/Jubewe", type: "PLAYING"}], 
        ["Ju", {url: "https://twitch.tv/Jubewe", type: "LISTENING"}],
        ["lol", {url: "https://twitch.tv/Jubewe", type: "STREAMING"}],
        ["lol", {url: "https://twitch.tv/Ju_B0T", type: "STREAMING"}]
    ]

    function setRandomActivity(){
        j.dc.client.user.setActivity(..._pickrandom(activities, 1));
    };

    setInterval(setRandomActivity, j.c().intervals.discord.randomactivity);
};