const _mainpath = require("../functions/_mainpath");

module.exports = {
  clientchannels: _mainpath("./data/clientchannels.json"),
  channels: _mainpath("./data/channels.json"),
  userids: _mainpath("./data/userids.json"),
  logcode: _mainpath("./data/log.txt"),
  permissions: _mainpath("./data/permissions.json"),
  cooldowns: _mainpath("./data/cooldowns.json"),
  ids: _mainpath("./data/ids.json"),
  timers: _mainpath("./data/timers.json"),
  usertokens: _mainpath("./data/usertokens.json"),
  afkusers: _mainpath("./data/afkusers.json"),
  cache: _mainpath("./data/cache.json"),
  reminders: _mainpath("./data/reminders.json"),

  commandlog: _mainpath("./data/commandlog.txt"),
  keywordlog: _mainpath("./data/keywordlog.txt"),
  counterlog: _mainpath("./data/counterlog.txt"),
  // seventvlog: _mainpath("./data/seventvlog.txt"),
};
