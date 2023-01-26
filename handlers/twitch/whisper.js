let j = require("../../variables/j");

const getuserperm = require("../../functions/twitch/getuserperm");
const userperms_ = require("../../functions/twitch/userperms");
const whisper_parser = require("../../functions/twitch/whisper_parser");
const _staticspacer = require("../../functions/_staticspacer");
const _log = require("../../functions/_log");
const dm_commandhandler = require("./dm_commandhandler");
const anna_dm_commandhandler = require("./anna/dm_commandhandler");
const messageargs = require("../../functions/twitch/messageargs");
const { PrivmsgMessage, parseTwitchMessage } = require("@kararty/dank-twitch-irc");

/**
 * @param {PrivmsgMessage} response 
 */
module.exports = async (response) => {
  response = parseTwitchMessage({...response}["_raw"]);
  
  let j_ = {"message":{"_":{}}};
  let whisper = whisper_parser(response);
  let message = j_.message.message = whisper.message;
  let userstate = j_.message.userstate = whisper.userstate;
  let channel = j_.message.channel = whisper.channel;
  let server = j_.message.server = whisper.server;
  
  let msg = j_.message._.msg = message.messageText;
  let user = j_.message._.user = userstate.username;
  let chan = j_.message._.chan = undefined;
  let _type = j_.message._.type = response.ircCommand;
  let usertag = j_.message._.usertag = `${user} > `;
  let usertag_ = j_.message._.usertag_ = `${(msg.split(" ")[1] && j.functions()._regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
  let userperm = j_.message._.userperm = await getuserperm(j_.message.userstate.id);
  let userperms = j_.message._.userperms = await userperms_(j_);
  let args = j_.message._.args = () => {return messageargs(j_, j)};
  _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);
   
  j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
    if((sendopt ?? undefined) && isNaN(sendopt) && !sendmessage){
      sendmessage = sendopt;
      sendopt = 1;
    };
    if(sendopt == 2){
      sendopt = 1;
    };
    j.send(sendopt, j_, sendmessage, undefined, undefined, sendmulti, sendreplacer);
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