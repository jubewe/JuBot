let j = require("../../variables/j");

const getuserperm = require("../../functions/twitch/getuserperm");
const userperms_ = require("../../functions/twitch/userperms");
const _staticspacer = require("../../functions/_staticspacer");
const _log = require("../../functions/_log");
const dm_commandhandler = require("./dm_commandhandler");
const anna_dm_commandhandler = require("./anna/dm_commandhandler");
const messageargs = require("../../functions/twitch/messageargs");
const whisperMessage = require("oberknecht-client/lib/parser/WHISPER.Message");

/**
 * @param {whisperMessage} response 
 */
module.exports = async (response) => {
  
  let j_ = {"message":{...response,"_":{}}};
  
  let message = j_.message.message = response.message;
  let userstate = j_.message.userstate = response.userstate;
  let channel = j_.message.channel = response.channel;
  let server = j_.message.server = response.server;
  
  let msg = j_.message._.msg = resoibse.message.messageText;
  let user = j_.message._.user = response.userstate.username;
  let chan = j_.message._.chan = undefined;
  let _type = j_.message._.type = response.IRCCommand;
  let usertag = j_.message._.usertag = `${user} > `;
  let usertag_ = j_.message._.usertag_ = `${(msg.split(" ")[1] && j.functions()._regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
  let userperm = j_.message._.userperm = await getuserperm(response.userstate.id);
  let userperms = j_.message._.userperms = await userperms_(j_);
  _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);
   
  j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
    if((sendopt ?? undefined) && isNaN(sendopt) && !sendmessage){
      sendmessage = sendopt;
      sendopt = 1;
    };
    if(sendopt == 2){
      sendopt = 1;
    };
    j.send(sendopt, userstate.id, sendmessage, undefined, undefined, sendmulti, sendreplacer);
  };

  if(new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
    let command = j_.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];
    
    (async () => {
      dm_commandhandler(j_, j);
    })();
  } else if(new RegExp(`^${j.c().anna.prefix}+[\\w]+`).test(msg)){
    let command = j_.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().anna.prefix)[1] : msg.split(j.c().anna.prefix)[1];
    (async () => {
      anna_dm_commandhandler(j_, j);
    })();
  }
};