const _mainpath = require("../functions/_mainpath");

module.exports = {
  config: _mainpath("./config.json"),
  clientchannels: _mainpath("./data/twitch/clientchannels.json"),
  channels: _mainpath("./data/twitch/channels.json"),
  userids: _mainpath("./data/twitch/userids.json"),
  // logcode: _mainpath("./data/log.txt"),
  permissions: _mainpath("./data/twitch/permissions.json"),
  cooldowns: _mainpath("./data/twitch/cooldowns.json"),
  ids: _mainpath("./data/twitch/ids.json"),
  timers: _mainpath("./data/twitch/timers.json"),
  usertokens: _mainpath("./data/twitch/usertokens.json"),
  afkusers: _mainpath("./data/twitch/afkusers.json"),
  cache: _mainpath("./data/cache.json"),
  reminders: _mainpath("./data/twitch/reminders.json"),
  phrases: _mainpath("./data/phrases.json"),

  log: _mainpath("./data/logs/log.txt"),
  commandlog: _mainpath("./data/logs/commandlog.txt"),
  keywordlog: _mainpath("./data/logs/keywordlog.txt"),
  counterlog: _mainpath("./data/logs/counterlog.txt"),
  seventvlog: _mainpath("./data/logs/seventvlog.txt"),
  notificationlog: _mainpath("./data/logs/notificationlog.txt"),
  trackerlog: _mainpath("./data/logs/trackerlog.txt"),

  startup: _mainpath("./data/_startup.json"),

  todo: _mainpath("./todo"),

  test: _mainpath("./test.txt"),

  // riotgames_userids: _mainpath("./data/riotgames/userids.json"),

  twitch_knownbots: _mainpath("./data/twitch/knownbots.json"),
  defaults: _mainpath("./data/defaults.json"),
  logcode: _mainpath("./data/logs/logcode.txt"),

  twitch: {
    clientchannels: _mainpath("./data/twitch/clientchannels.json"),
    
  },

  discord: {
    clientguilds: _mainpath("./data/discord/clientguilds.json"),
    
  }
  
};
