let j = require("../../variables/j");
const privmsg_parser = require("../../functions/twitch/privmsg_parser");
let subcache = {
    "masssubgift":{},
    "subgift":{}
};

module.exports = async (response) => {
    let j_ = {"message":{"_":{}}};
    if(!j.c().modules.notifications) return;
    let privmsg = privmsg_parser(response);
  
    let message = j_.message.message = privmsg.message;
    let userstate = j_.message.userstate = privmsg.userstate;
    let channel = j_.message.channel = privmsg.channel;
    let server = j_.message.server = privmsg.server;
  
    let channels = j.files().channels;
    let channelnotifications = (channels.channels[response.channelID] && channels.channels[response.channelID]["notifications"] ? channels.channels[response.channelID]["notifications"] : {});
    (async () => {
      if(response.isCheer()){
        executenotification("cheer");
      } 
      if(response.isSub()){
        executenotification("subscription");
      }
      if(response.isResub()){
        executenotification("resub");
      }
      if(response.isSubgift() || response.isAnonSubgift()){
        if(!Object.keys(subcache.masssubgift).includes(response.senderUserID || "anonymus") || (Date.now()-subcache.masssubgift[response.senderUserID || "anonymus"] > 2000)){
          executenotification("subgift");
        }
      }
      if(response.isMassSubgift()){
        subcache.masssubgift[response.senderUserID || "anonymus"] = Date.now();
        executenotification("masssubgift");
      }
    })();
  
    function executenotification(notificationname){
      if(Object.keys(channelnotifications).includes(notificationname)){
        if([1].includes(channelnotifications[notificationname].state)){
          // j.send(0, response.channelName, channels.channels[response.channelID]["notifications"][notificationname].message || j.c().notifications.defaultmessages.cheer);
          console.log(channels.channels[response.channelID]["notifications"][notificationname].message || j.c().notifications.defaultmessages.cheer);
        }
      }
    };
};