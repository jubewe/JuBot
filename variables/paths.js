const mainpath = require("../functions/_mainpath");

module.exports = {
  clientchannels: mainpath("./data/clientchannels.json"),
  channels: mainpath("./data/channels.json"),
  userids: mainpath("./data/userids.json"),
  logcode: mainpath("./data/log.txt"),
  permissions: mainpath("./data/permissions.json"),
  cooldowns: mainpath("./data/cooldowns.json"),
  ids: mainpath("./data/ids.json"),
  
  
};
