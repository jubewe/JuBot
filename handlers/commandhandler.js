const getuserperm = require("../functions/getuserperm");
const _cooldown = require("../functions/_cooldown");

async function commandhandler() {
  let j = require("../variables/j");
  let commands = j.commands();

  if (Object.keys(commands).includes(j.message._.command)) {
    let command = commands[j.message._.command];
    let commandid = (Object.keys(commands).includes(j.message._.command) ? `${j.message.channel.id}_${command.id}` : command.id);

    if ([1].includes(command.state)) {
      if (parseInt(j.message._.userperm.num) >= command.permission) {
        _cooldown(0, j.message.channel.id, commandid, j.message.userstate.id, false)
        .then((c) => {
          if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown)){
            if(c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user)){
              (async () => {
                commands[j.message._.command].exec();
                if(command.cooldown > 0 || command.cooldown_user > 0){
                  _cooldown(1, j.message.channel.id, commandid, j.message.userstate.id, true)
                  .then(c2 => {
                    // console.log(`cooldown set `, c2);
                  })
                  .catch(e => {throw e});
                  }
              })();
            }
          }
        })

      } else {
        if(j.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
          j.send(2, null, `Error: You don't have permission to perform that action (required: ${getuserperm(j.message.userstate.id).num})`);
        }
      }
    }
  }
};

module.exports = commandhandler;