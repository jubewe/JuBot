const mainpath = require("../functions/_mainpath");

module.exports = {
  clientchannels: mainpath("./data/clientchannels.json"),
  channels: mainpath("./data/channels.json"),
  userids: mainpath("./data/userids.json"),
  logcode: mainpath("./data/log.txt"),
  permissions: mainpath("./data/permissions.json"),
  cooldowns: mainpath("./data/cooldowns.json"),
  ids: mainpath("./data/ids.json"),
  timers: mainpath("./data/timers.json"),
  usertokens: mainpath("./data/usertokens.json"),
  afkusers: mainpath("./data/afkusers.json"),
  cache: mainpath("./data/cache.json"),
  reminders: mainpath("./data/reminders.json"),

  commandlog: mainpath("./data/commandlog.txt"),
  keywordlog: mainpath("./data/keywordlog.txt"),
  counterlog: mainpath("./data/counterlog.txt"),
  seventvlog: mainpath("./data/seventvlog.txt"),
};
