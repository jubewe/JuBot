const _rf = require("../functions/_rf");
const paths = require("./paths");

module.exports = {
    channels: _rf(paths.channels, true),
    clientchannels: _rf(paths.clientchannels, true),
    userids: _rf(paths.userids, true),
    logcode: _rf(paths.logcode, true),
    permissions: _rf(paths.permissions, true),
    cooldowns: _rf(paths.cooldowns, true),
    ids: _rf(paths.ids, true),
    timers: _rf(paths.timers, true),
    usertokens: _rf(paths.usertokens, true),
    afkusers: _rf(paths.afkusers, true),
    cache: _rf(paths.cache, true),
    reminders: _rf(paths.reminders, true),

    commandlog: _rf(paths.commandlog, true),
    keywordlog: _rf(paths.keywordlog, true),
    counterlog: _rf(paths.counterlog, true)
}