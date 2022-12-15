const _rf = require("../functions/_rf");
const paths = require("./paths");

module.exports = {
    config: _rf(paths.config, true),
    channels: _rf(paths.channels, true),
    // logcode: _rf(paths.logcode, true),
    clientchannels: _rf(paths.clientchannels, true),
    userids: _rf(paths.userids, true),
    permissions: _rf(paths.permissions, true),
    cooldowns: _rf(paths.cooldowns, true),
    ids: _rf(paths.ids, true),
    timers: _rf(paths.timers, true),
    usertokens: _rf(paths.usertokens, true),
    afkusers: _rf(paths.afkusers, true),
    cache: _rf(paths.cache, true),
    reminders: _rf(paths.reminders, true),
    phrases: _rf(paths.phrases, true),

    commandlog: _rf(paths.commandlog, true),
    keywordlog: _rf(paths.keywordlog, true),
    counterlog: _rf(paths.counterlog, true),
    log: _rf(paths.log, true),

    startup: _rf(paths.startup, true),

    test: _rf(paths.test, false),

    // riotgames_userids: _rf(paths.riotgames_userids, true),

    twitch_knownbots: _rf(paths.twitch_knownbots, true),
    defaults: _rf(paths.defaults, true),

    discord: {
        clientguilds: _rf(paths.discord.clientguilds, true),
        userids: _rf(paths.discord.userids, true),
        permissions: _rf(paths.discord.permissions, true),
        
    }

}