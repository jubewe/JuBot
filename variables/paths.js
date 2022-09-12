const mainpath = require("../functions/_mainpath");

module.exports = {
  channels: mainpath("./data/channels.json"),
  userids: mainpath("./data/userids.json"),
  logcode: mainpath("./data/log.txt"),
  permissions: mainpath("./data/permissions.json"),

  
};
