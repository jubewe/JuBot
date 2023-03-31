let j = require("../../variables/j");
const usernoticeMessage = require("oberknecht-client/lib/parser/USERNOTICE.Message");
let subcache = {
  "masssubgift": {},
  "subgift": {}
};

/** @param {usernoticeMessage} response */
module.exports = async (response) => {
  let j_ = { "message": { "_": {} } };
  if (!j.c().modules.notifications) return;

  let message = j_.message.message = response.message;
  let userstate = j_.message.userstate = response.userstate;
  let channel = j_.message.channel = response.channel;
  let server = j_.message.server = response.server;

  let channels = j.files().channels;
  let channelnotifications = (channels.channels[response.channelID] && channels.channels[response.channelID]["notifications"] ? channels.channels[response.channelID]["notifications"] : {});
  (async () => {
    switch (response.msgID) {
      case "sub": {
        executenotification("subscription");
        break;
      };

      case "resub": {
        executenotification("resub");
        break;
      };

      case "subgift":
      case "submysterygift":
      case "anonsubgift": {
        let user = response.IRCParameters.login;
        if (!subcache.masssubgift[user] || (Date.now() - subcache.masssubgift[user] > 2000)) executenotification("subgift");
        break;
      };
    };
  })();

  function executenotification(notificationname) {
    if (!Object.keys(channelnotifications).includes(notificationname) || ![1].includes(channelnotifications[notificationname].state)) return;
    j.send(0, response.channelName, channels.channels[response.channelID]["notifications"][notificationname].message || j.c().notifications.defaultmessages.cheer);
  };
};