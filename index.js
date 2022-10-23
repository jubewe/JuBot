require("./_init")();
require("./express/index")();

const getuserperm = require("./functions/getuserperm");
const userperms_ = require("./functions/userperms");
const whisper_parser = require("./functions/whisper_parser");
const { privmsg_parser, log } = require("./functions/_");
const _afk = require("./functions/_afk");
const _cleantime = require("./functions/_cleantime");
const _rf = require("./functions/_rf");
const _staticspacer = require("./functions/_staticspacer");
const commandhandler = require("./handlers/commandhandler");
const dm_commandhandler = require("./handlers/dm_commandhandler");

let j = require("./variables/j");

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
    let userperm = j.message._.userperm = await getuserperm(j.message.userstate.id);
    let userperms = j.message._.userperms = await userperms_();
    // j.send = require("./functions/send");

    log(0, `${_staticspacer(2, "#" + chan)} ${_staticspacer(2, user)} ${msg}`);

    (async () => {
      _afk(2, j.message.userstate.id, null, null, true)
      .then(a => {
        if(Object.keys(a).length > 0){
          j.send(0, null, `${user} is no longer AFK: ${a.message} (${_cleantime(Date.now()-a.start, 4, "auto").time.join(" ")} ago)`);
        }
      })
      .catch(e => {
        // console.error(e);
      });
    })();

    if (msg.startsWith(j.c().prefix)) {
      let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];

        (async() => {
          commandhandler();
        })()

      /*
          if(Object.keys(commands).includes(command)){
              if("state_check"){
                  if("perm_check"){
                      if("cooldown_check"){
                          if("cooldown_check_user"){

                          }
                      }
                  }
              }
          }
          */
    }
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

    j.send = require("./functions/send");

    log(0, `${_staticspacer(1, "[W] <-")} ${_staticspacer(2, user)} ${msg}`);

    if(msg.startsWith(j.c().prefix)){
      let command = j.message._.command = msg.split(" ")[1] !== undefined ? msg.split(" ")[0].split(j.c().prefix)[1] : msg.split(j.c().prefix)[1];

      (async () => {
        dm_commandhandler();
      })();
    }
  })();
});

