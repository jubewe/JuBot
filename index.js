require("./_init")();
require("./express/index")();

const getuserperm = require("./functions/getuserperm");
const userperms_ = require("./functions/userperms");
const whisper_parser = require("./functions/whisper_parser");
const { privmsg_parser, _channel } = require("./functions/_");
const _afk = require("./functions/_afk");
const _cleantime = require("./functions/_cleantime");
const _staticspacer = require("./functions/_staticspacer");
const _log = require("./functions/_log");
const commandhandler = require("./handlers/twitch/commandhandler");
const dm_commandhandler = require("./handlers/twitch/dm_commandhandler");
const anna_dm_commandhandler = require("./handlers/twitch/anna/dm_commandhandler");

let j = require("./variables/j");
const custom_commandhandler = require("./handlers/twitch/custom_commandhandler");
const custom_keywordhandler = require("./handlers/twitch/custom_keywordhandler");
const _combineArr = require("./functions/_combineArr");
const remind = require("./functions/remind");
const getuser = require("./functions/getuser");
const paths = require("./variables/paths");
const messageargs = require("./functions/twitch/messageargs");
let subcache = {
  "masssubgift":{},
  "subgift":{}
};

j.client.on("PRIVMSG", async (response) => {
  let j_ = {"message":{"_":{}}};
    let privmsg = privmsg_parser(response);
    privmsg.message.messageText = privmsg.message.messageText.replace(/(^\s|\s$)/g, "").replace(/[\s]{2,}/g, " ");
    let modified_channel = j_.message._.modified_channel = false;

    let msgchanmatch = privmsg.message.messageText.match(new RegExp(`\-chan\:[^\\s]+`, "i"));
    if(msgchanmatch !== null){
      await new Promise((resolve) => {
        getuserperm(privmsg.userstate.id)
        .then(uperm => {
          if(uperm.num >= j.c().perm.botdefault){
            let msgchan = msgchanmatch[0].split(new RegExp(`\-chan\:`))[1];
            getuser(1, msgchan)
            .then(u => {
              privmsg.channel.name = u[0];
              privmsg.channel.nameraw = u[0];
              privmsg.channel.id = u[1];

              modified_channel = j_.message._.modified_channel = true;

              privmsg.message.messageText = privmsg.message.messageText.replace(msgchanmatch[0], "");
              return resolve();
            })
            .catch(() => {
              privmsg.message.messageText = privmsg.message.messageText.replace(msgchanmatch[0], "");
              return resolve();
            })
          } else {
            return resolve();
          }
        })
      })
    }

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

    _log(0, `${_staticspacer(2, "#" + chan)} ${_staticspacer(2, user)} ${msg}`);

    // console.log(j_);

    if(j_.message.userstate.id == j.env().T_USERID) return;

    if(!msg.includes("-afk")){
      (async () => {
        _afk(2, j_.message.userstate.id, null, null, true)
        .then(a => {
          if(Object.keys(a).length > 0){
            j.send(0, j_, `${user} is no longer AFK: ${a.message} (${_cleantime(Date.now()-a.start, 4, "auto").time.join(" ")} ago)`);
          }
        })
        .catch(e => {
          // console.error(e);
        });
      })();
    };

    (async () => {
      remind(3, j_, false, null, j_.message.userstate.id)
      .then(r => {
        if(r.length > 0){
          j.send(0, j_, `${usertag} You have ${r.length} new Reminders:`);
          let reminders_ = [];
          (async () => {
            for(let r2 in r){
              if(r[r2].sender_userid === r[r2].target_userid){
                reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4, 2).time.join(" ")} ago by yourself)`);
              } else {
                await getuser(1, r[r2].sender_userid)
                .then(u => {
                  reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4, 2).time.join(" ")} ago by ${u[0]} (${u[1]}))`);
                })
                .catch(() => {undefined
                  reminders_.push(`${r[r2].message} (${_cleantime(Date.now()-r[r2].time, 4, 2).time.join(" ")} ago by ${r[r2].sender_userid})`);
                })
              }
            }
            j.send(0, j_, `${usertag} ${reminders_.join("; ")}`);
          })();
        }
      })
      .catch(e => {
        console.error(e);
      })
    })();
    
    let prefix = j_.message._.prefix = j.c().prefix;
    _channel(0, channel.id, undefined, undefined, true)
    .then(ch => {
      prefix = j_.message._.prefix = (ch.prefix ? (new RegExp(`^${j.c().prefix}`).test(msg) ? j.c().prefix : ch.prefix) : j.c().prefix);
      if(new RegExp(`^${prefix}+[\\w]+`).test(msg) || new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
        let always_allowed = ["setting", "settings"];
        let command = j_.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(prefix)[1].toLowerCase() : msg.split(prefix)[1].toLowerCase();
        if(new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg) && always_allowed.includes(command) ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1]){
          command = j_.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1].toLowerCase() : msg.split(j.c().prefix)[1].toLowerCase(); 
        }
        if(ch.allowed_commands === undefined || ch.allowed_commands.length === 0 || always_allowed.includes(command) || ch.allowed_commands.includes(command)){
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
  let chan = j_.message._.chan = channel.name;
  let _type = j_.message._.type = response.ircCommand;
  let usertag = j_.message._.usertag = `${user} > `;
  let usertag_ = j_.message._.usertag_ = `${(msg.split(" ")[1] && j.functions().regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
  let userperm = j_.message._.userperm = await getuserperm(j_.message.userstate.id);
  let userperms = j_.message._.userperms = userperms_();
  _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);
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