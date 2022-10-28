require("./_init")();
require("./express/index")();

const getuserperm = require("./functions/getuserperm");
const userperms_ = require("./functions/userperms");
const whisper_parser = require("./functions/whisper_parser");
const { privmsg_parser, _channel } = require("./functions/_");
const _afk = require("./functions/_afk");
const _cleantime = require("./functions/_cleantime");
const _rf = require("./functions/_rf");
const _staticspacer = require("./functions/_staticspacer");
const _log = require("./functions/_log");
const commandhandler = require("./handlers/twitch/commandhandler");
const dm_commandhandler = require("./handlers/twitch/dm_commandhandler");

let j = require("./variables/j");
const custom_commandhandler = require("./handlers/twitch/custom_commandhandler");
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
    
    _channel(0, channel.id, undefined, undefined, true)
    .then(ch => {
      if(ch.prefix && msg.startsWith(ch.prefix) || msg.startsWith(j.c().prefix)){
        let always_allowed = ["setting", "settings"];
        let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(ch.prefix || j.c().prefix)[1].toLowerCase() : msg.split(ch.prefix || j.c().prefix)[1].toLowerCase();
        if(msg.startsWith(j.c().prefix) && always_allowed.includes(msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1])){
          command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1].toLowerCase() : msg.split(j.c().prefix)[1].toLowerCase(); 
        }
        if(ch.allowed_commands === undefined || ch.allowed_commands.length === 0 || always_allowed.includes(command) || (ch.allowed_commands && ch.allowed_commands.includes(command))){
          (async () => {
            let command_ = _combineArr(...Object.keys(ch.commands).map(cmd => {return _combineArr(ch.commands[cmd].name, ch.commands[cmd].aliases)}));
            if(!always_allowed.includes(command) && !j.c().commands.custom.restricted.includes(command) && ch.commands && command_ && command_.includes(command)){
              custom_commandhandler(j);
            } else {
              commandhandler(j);
            }
          })();
        }
      }
    })
    .catch(e => {
      if (msg.startsWith(j.c().prefix)) {
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
    let userperm = j.message._.userperm = await getuserperm(j.message.userstate.id);
    let userperms = j.message._.userperms = userperms_();

    _log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);

    if(msg.startsWith(j.c().prefix)){
      let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];

      (async () => {
        dm_commandhandler(j);
      })();
    }
  })();
});

