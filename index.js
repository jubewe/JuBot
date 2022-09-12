require("./_init")();

const getuserperm = require("./functions/getuserperm");
const { privmsg_parser, log } = require("./functions/_");
const commandhandler = require("./handlers/commandhandler");

let j = require("./variables/j");
j.client.on("PRIVMSG", (response) => {
//  j = require("./variables/j");
  let privmsg = privmsg_parser(response);

  let message = j.message.message = privmsg.message || {};
  let userstate = j.message.userstate = privmsg.userstate || {};
  let channel = j.message.channel = privmsg.channel || {};
  let server = j.message.server = privmsg.server || {};

  let msg = j.message._.msg = message.messageText;
  let user = j.message._.user = userstate.username;
  let chan = j.message._.chan = channel.name;
  let usertag = j.message._.usertag = `@${user}, `;
  let userperm = j.message._.userperm = getuserperm(j.message.userstate.id);
  j.send = require("./functions/send");

  log(0, `#${chan}\t${user}\t: ${msg}`);

  if (msg.startsWith(j.c().prefix)) {
    let command = j.message._.command =
      msg.split(" ")[1] !== undefined
        ? msg.split(" ")[0].split(j.c().prefix)[1]
        : msg.split(j.c().prefix)[1];

      (async() => {
        commandhandler(j);
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
});
