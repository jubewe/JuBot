const getuserperm = require("../functions/getuserperm");

async function commandhandler() {
  let j = require("../variables/j");
  let commands = j.commands();

  if (Object.keys(commands).includes(j.message._.command)) {
    let command = commands[j.message._.command];
    if ([1].includes(command.state)) {
      if (parseInt(j.message._.userperm.num) >= command.permission) {
        if ("cooldown_check") {
          if ("cooldown_check_user") {
            (async () => {
              commands[j.message._.command].exec();
            })();
          }
        }
      } else {
        if(j.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
          j.send(2, null, `Error: You don't have permission to perform that action (required: ${getuserperm(j.message.userstate.id).num})`);
        }
      }
    }
  }
};

module.exports = commandhandler;