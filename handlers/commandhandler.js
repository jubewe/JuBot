function commandhandler() {
  let j = require("../variables/j");
  let commands = j.commands();

  if (Object.keys(commands).includes(j.message._.command)) {
    if ("state_check") {
      if ("perm_check") {
        if ("cooldown_check") {
          if ("cooldown_check_user") {
            (async () => {
              commands[j.message._.command].exec();
            })();
          }
        }
      }
    }
  }
};

module.exports = commandhandler;