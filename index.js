require("./_init")();

const { privmsg_parser, log } = require("./functions/_");
let j = require("./variables/j");

j.client.on("PRIVMSG", (response) => {
  (async () => {
    j = require("./variables/j");
    let privmsg = (j.message = privmsg_parser(response));

    let message = privmsg.message;
    let userstate = privmsg.userstate;
    let channel = privmsg.channel;
    let server = privmsg.server;

    let msg = (j.message._.msg = message.messageText);
    let user = (j.message._.user = userstate.username);
    let chan = (j.message._.chan = channel.name);
    let usertag = (j.message._.usertag = `@${user}, `);
    let commands = j.commands();

    log(0, `#${chan}\t${user}\t()`)

    if (msg.startsWith(j.c().prefix)) {
      let command = (j.message._.command =
        msg.split(" ")[1] !== undefined
          ? msg.split(" ")[0].split(j.c().prefix)[1]
          : msg.split(j.c().prefix[1]));

      if (Object.keys(commands).includes(command)) {
        if ("state_check") {
          if ("perm_check") {
            if ("cooldown_check") {
              if ("cooldown_check_user") {
                (async () => {
                  commands[command].exec();
                })();
              }
            }
          }
        }
      }

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
