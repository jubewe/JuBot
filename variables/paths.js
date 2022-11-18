const _mainpath = require("../functions/_mainpath");

module.exports = {
  config: _mainpath("./config.json"),
  clientchannels: _mainpath("./data/clientchannels.json"),
  channels: _mainpath("./data/channels.json"),
  userids: _mainpath("./data/userids.json"),
  // logcode: _mainpath("./data/log.txt"),
  permissions: _mainpath("./data/permissions.json"),
  cooldowns: _mainpath("./data/cooldowns.json"),
  ids: _mainpath("./data/ids.json"),
  timers: _mainpath("./data/timers.json"),
  usertokens: _mainpath("./data/usertokens.json"),
  afkusers: _mainpath("./data/afkusers.json"),
  cache: _mainpath("./data/cache.json"),
  reminders: _mainpath("./data/reminders.json"),
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
  
};
