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

j.client.on("PRIVMSG", (response) => {
//  j = require("./variables/j");
  (async () => {
    let privmsg = privmsg_parser(response);

    let message = j.message.message = privmsg.message;
    let userstate = j.message.userstate = privmsg.userstate;
    let channel = j.message.channel = privmsg.channel;
    let server = j.message.server = privmsg.server;

    let msg = j.message._.msg = message.messageText;
    let user = j.message._.user = userstate.username;
    let chan = j.message._.chan = channel.name;
    let _type = j.message._.type = response.ircCommand;
    let usertag = j.message._.usertag = `${user} > `;
    let usertag_ = j.message._.usertag_ = `${(msg.split(" ")[1] && j.functions().regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
    let userperm = j.message._.userperm = await getuserperm(j.message.userstate.id);
    let userperms = j.message._.userperms = await userperms_();
    // j.send = require("./functions/send");

    _log(0, `${_staticspacer(2, "#" + chan)} ${_staticspacer(2, user)} ${msg}`);

    if(j.message.userstate.id == j.env().T_USERID) return;

    if(!msg.includes("-afk")){
      (async () => {
        _afk(2, j.message.userstate.id, null, null, true)
        .then(a => {
          if(Object.keys(a).length > 0){
            j.send(0, j, `${user} is no longer AFK: ${a.message} (${_cleantime(Date.now()-a.start, 4, "auto").time.join(" ")} ago)`);
          }
        })
        .catch(e => {
          // console.error(e);
        });
      })();
    }
    
    let prefix = j.message._.prefix = j.c().prefix;
    _channel(0, channel.id, undefined, undefined, true)
    .then(ch => {
      prefix = j.message._.prefix = (ch.prefix ? (new RegExp(`^${j.c().prefix}`).test(msg) ? j.c().prefix : ch.prefix) : j.c().prefix);
      if(new RegExp(`^${prefix}+[\\w]+`).test(msg) || new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
        let always_allowed = ["setting", "settings"];
        let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(prefix)[1].toLowerCase() : msg.split(prefix)[1].toLowerCase();
        if(new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg) && always_allowed.includes(command) ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1]){
          command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1].toLowerCase() : msg.split(j.c().prefix)[1].toLowerCase(); 
        }
        if(ch.allowed_commands === undefined || ch.allowed_commands.length === 0 || always_allowed.includes(command) || ch.allowed_commands.includes(command)){
          (async () => {
            let command_ = [];
            if(ch.commands){
              command_ = _combineArr(...Object.keys(ch.commands).map(cmd => {return _combineArr(ch.commands[cmd].name, ch.commands[cmd].aliases)}));
            }
            if(!always_allowed.includes(command) && !j.c().commands.custom.restricted.includes(command) && ch.commands && command_ && command_.includes(command)){
              custom_commandhandler(j);
            } else {
              commandhandler(j);
            }
          })();
        }
      } else if(ch.keywords && new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => {return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases)})).join("|")})\\b`, "i").test(msg.toLowerCase())){
        let keyword = j.message._.keyword = msg.toLowerCase().match(new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => {return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases)})).join("|")})\\b`, "i"))[0];
        (async () => {
          custom_keywordhandler();
        })();
      }
    })
    .catch(e => {
      if (new RegExp(`^${prefix}+[\\w]+`).test(msg)) {
        let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];
        (async() => {
          commandhandler(j);
        })();
      } 
    })
  })();
});

j.client.on("WHISPER", response => {
  (async () => {
    let whisper = whisper_parser(response);

    let message = j.message.message = whisper.message;
    let userstate = j.message.userstate = whisper.userstate;
    let channel = j.message.channel = whisper.channel;
    let server = j.message.server = whisper.server;
    
    let msg = j.message._.msg = message.messageText;
    let user = j.message._.user = userstate.username;
    let chan = j.message._.chan = channel.name;
    let _type = j.message._.type = response.ircCommand;
    let usertag = j.message._.usertag = `${user} > `;
    let usertag_ = j.message._.usertag_ = `${(msg.split(" ")[1] && j.functions().regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
    let userperm = j.message._.userperm = await getuserperm(j.message.userstate.id);
    let userperms = j.message._.userperms = userperms_();

    _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);

    if(new RegExp(`^${j.c().prefix}+[\\w]+`).test(msg)){
      let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];
      
      (async () => {
        dm_commandhandler(j);
      })();
    } else if(new RegExp(`^${j.c().anna.prefix}+[\\w]+`).test(msg)){
      let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().anna.prefix)[1] : msg.split(j.c().anna.prefix)[1];
      (async () => {
        anna_dm_commandhandler(j);
      })();
    }
  })();
});