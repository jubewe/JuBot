let j = require("./variables/j");

const getuserperm = require("./functions/getuserperm");
const userperms_ = require("./functions/userperms");
const whisper_parser = require("./functions/whisper_parser");
const _afk = require("./functions/_afk");
const privmsg_parser = require("./functions/privmsg_parser");
const _channel = require("./functions/_channel");
const _cleantime = require("./functions/_cleantime");
const _staticspacer = require("./functions/_staticspacer");
const _log = require("./functions/_log");
const commandhandler = require("./handlers/twitch/commandhandler");
const dm_commandhandler = require("./handlers/twitch/dm_commandhandler");
const anna_dm_commandhandler = require("./handlers/twitch/anna/dm_commandhandler");
const custom_commandhandler = require("./handlers/twitch/custom_commandhandler");
const custom_keywordhandler = require("./handlers/twitch/custom_keywordhandler");
const _combineArr = require("./functions/_combineArr");
const remind = require("./functions/remind");
const getuser = require("./functions/getuser");
const messageargs = require("./functions/twitch/messageargs");
let subcache = {
  "masssubgift":{},
  "subgift":{}
};

require("./_init")();
require("./handlers/_")();
require("./functions/other/getknownbots")();

if(j.c().connect.express.app){
  require("./express/index")();
}

j.client.on("PRIVMSG", async (response) => {
  let j_ = {"message":{"_":{}}};
  let privmsg = privmsg_parser(response);
  privmsg.message.messageText = privmsg.message.messageText.replace(/(^\s|\s$)/g, "").replace(/[\s]{2,}/g, " ");
  let modified_channel = j_.message._.modified_channel = undefined;

  let msgchanmatch = privmsg.message.messageText.match(new RegExp(`(\-chan\:[^\\s]+|^${j.c().prefix}\\b\\w+\\b\:+\\w+)`, "i"));
  if(msgchanmatch !== null){
      await new Promise((resolve) => {
        getuserperm(privmsg.userstate.id)
        .then(uperm => {
          if(uperm.num >= j.c().perm.botdefault){
            let msgchanmatch0 = new RegExp(`(\-chan\:|^${j.c().prefix}\\b\\w+\\b\:)`, "i");
            let msgchan = msgchanmatch[0].split(msgchanmatch[0].match(msgchanmatch0)[0])[1];

            let msgchanmatchreplace = new RegExp(`\-chan\:[^\\s]+`, "i")
            if(msgchanmatch[0].match(new RegExp(`^${j.c().prefix}\\b\\w+\\b\:+\\w+`, "i"))){
              msgchanmatchreplace = `:${msgchan}`;
            }

            getuser(1, msgchan)
            .then(u => {
              if(privmsg.channel.id != u[1]){
                j_.message._.modified_channel = {
                  name: privmsg.channel.name,
                  nameraw: privmsg.channel.nameraw,
                  id: privmsg.channel.id,
                };
                privmsg.channel.name = u[0];
                privmsg.channel.nameraw = u[0];
                privmsg.channel.id = u[1];
              }

              privmsg.message.messageText = privmsg.message.messageText.replace(msgchanmatchreplace, "");
              return resolve();
            })
            .catch(() => {
              privmsg.message.messageText = privmsg.message.messageText.replace(msgchanmatchreplace, "");
              return resolve();
            })
          } else {
            return resolve();
          }
        })
      })
  };

  let msgusermatch = privmsg.message.messageText.match(new RegExp(`\-user\:[^\\s]+`, "i"));
  if(msgusermatch !== null){
    await new Promise((resolve) => {
      getuserperm(privmsg.userstate.id)
      .then(uperm => {
        if(uperm.num >= j.c().perm.botdefault){
          let msguser = msgusermatch[0].split(new RegExp(`\-user\:`))[1].toLowerCase();
          if(![j.e().T_USERNAME, j.e().T_USERNAME_PV].includes(msguser) && [j.e().T_USERNAME, j.e().T_USERNAME_PV].includes(privmsg.userstate.username)){
            getuser(1, msguser)
            .then(u => {
              j_.message._.modified_user = {
                username: privmsg.userstate.username,
                id: privmsg.userstate.id,
              };
              privmsg.userstate.username = u[0];
              privmsg.userstate.id = u[1];

              privmsg.message.messageText = privmsg.message.messageText.replace(msgusermatch[0], "");
              return resolve();
            })
            .catch(() => {
              privmsg.message.messageText = privmsg.message.messageText.replace(msgusermatch[0], "");
              return resolve();
            })
          } else {
            privmsg.message.messageText = privmsg.message.messageText.replace(msgusermatch[0], "NOIDONTTHINKSO du Frechdachs");
            return resolve();
          }
        } else {
          return resolve();
        }
      })
    })
  };

  let message = j_.message.message = privmsg.message;
  let userstate = j_.message.userstate = privmsg.userstate;
  let channel = j_.message.channel  = privmsg.channel;
  let server = j_.message.server = privmsg.server;

  let msg = j_.message._.msg = message.messageText;
  let user = j_.message._.user = userstate.username;
  let chan = j_.message._.chan = channel.name;
  let _type = j_.message._.type = response.ircCommand;
  let usertag = j_.message._.usertag = `${user} > `;
  let usertag_ = j_.message._.usertag_ = `${(msg.split(" ")[1] && j.functions()._regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
  let userperm = j_.message._.userperm = await getuserperm(j_.message.userstate.id);
  let userperms = j_.message._.userperms = await userperms_(j_);
  let args = j_.message._.args = () => {return messageargs(j_, j)};

  if([1].includes(j.c().modules.log.twitch.privmsg) || [2].includes(j.c().modules.log.twitch.privmsg) && j.files().clientchannels.logchannels.includes(channel.id)){
    _log(0, `${_staticspacer(2, "#" + chan)} ${_staticspacer(2, user)} ${msg}`);
  }

  j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
    if(isNaN(sendopt) && !sendmessage){
      sendmessage = sendopt;
      sendopt = 2;
    }

    j.send(sendopt, j_, sendmessage, undefined, undefined, sendmulti, sendreplacer);
  };

  if(j_.message.userstate.id == j.env().T_USERID) return;

  (async () => {
    if(!msg.includes("-afk")){
      _afk(2, j_, j_.message.userstate.id, null, null, true)
      .then(a => {
        if(Object.keys(a).length > 0){
          j_.send(0, `${user} is no longer AFK: ${a.message} (${_cleantime(Date.now()-a.start, 4).time.join(" ")} ago)`);
        }
      })
      .catch(e => {});
    };
    remind(3, j_, false, null, j_.message.userstate.id)
    .then(r => {
      if(r.length > 0){
        let reminders_ = [];
        (async () => {
          for(let r2 in r){
            if(r[r2].sender_userid === r[r2].target_userid){
              reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4).time.join(" ")} ago by yourself)`);
            } else {
              await getuser(1, r[r2].sender_userid)
              .then(u => {
                reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4).time.join(" ")} ago by ${u[0]} (${u[1]}))`);
              })
              .catch(() => {
                reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4).time.join(" ")} ago by ${r[r2].sender_userid})`);
              })
            }
          }
          j_.send(0, `${usertag} You have ${r.length} new Reminders ${reminders_.join("; ")}`);
        })();
      }
    })
    .catch(e => {})
  })();
  
  let prefix = j_.message._.prefix = j.c().prefix;
  _channel(0, channel.id, undefined, undefined, true)
  .then(ch => {
    prefix = j_.message._.prefix = (ch.prefix ? (new RegExp(`^${j.c().prefix}`).test(msg) ? j.c().prefix : ch.prefix) : j.c().prefix);
    if(new RegExp(`^${prefix}+[\\w]+`).test(msg) || new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
      let always_allowed = j.c().commands.always_allowed;
      let command = j_.message._.command = msg.split(" ")[0].split(prefix)[1].toLowerCase();
      if(new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
        command = j_.message._.command = msg.split(" ")[0].split(j.c().prefix)[1].toLowerCase();
      }
      if(!ch.allowed_commands || always_allowed.includes(command) || ch.allowed_commands.includes(command) || userperms._default){
        (async () => {
          let command_ = [];
          if(ch.commands){
            command_ = _combineArr(...Object.keys(ch.commands).map(cmd => {return _combineArr(ch.commands[cmd].name, ch.commands[cmd].aliases)}));
          }

          if(!always_allowed.includes(command) && !j.c().commands.custom.restricted.includes(command) && ch.commands && command_ && command_.includes(command)){
            custom_commandhandler(j_, j);
          } else {
            commandhandler(j_, j);
          }
        })();
      }
    } else if(ch.keywords && new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => {return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases)})).join("|")})\\b`, "i").test(msg.toLowerCase())){
      let keyword = j_.message._.keyword = msg.toLowerCase().match(new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => {return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases)})).join("|")})\\b`, "i"))[0];
      (async () => {
        custom_keywordhandler(j_, j);
      })();
    }
  })
  .catch(e => {
    if (new RegExp(`^${prefix}+[\\w]+`).test(msg)) {
      let command = j_.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];
      (async() => {
        commandhandler(j_, j);
      })();
    } 
  })
});

j.client.on("WHISPER", async (response) => {
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
  let userperms = j_.message._.userperms = userperms_(j_);
  let args = j_.message._.args = () => {return messageargs(j_, j)};

  _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);

  // if(["dau8er", "jubewe"].includes(user)){
  //   j.client.whisper(user, `WrapItUp`);
  // }

  j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
    if(isNaN(sendopt) && !sendmessage){
      sendmessage = sendopt;
      sendopt = 1;
    }
    if(sendopt == 2){
      sendopt = 1;
    }

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
});

j.client.on("USERNOTICE", async (response) => {
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
});