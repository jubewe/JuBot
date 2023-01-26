const getuserperm = require("../../functions/twitch/getuserperm");
const _cooldown = require("../../functions/twitch/_cooldown");
const _permission = require("../../functions/twitch/_permission");

async function commandhandler(j_, j) {
  let [commands, message] = [j.commands(), j_.message];
  if(!Object.keys(commands).includes(message._.command)) return;
  let [command, commandid] = [commands[message._.command], (Object.keys(commands).includes(message._.command) ? `${message.channel.id}_${message._.command.id}` : message._.command.id)];

  if ([1].includes(command.state)) {
    // console.log(0);
    if (parseInt(message._.userperm.num) >= command.permission) {
      // console.log(1);
      _cooldown(0, message.channel.id, commandid, message.userstate.id, false)
      .then((c) => {
        if (c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || message._.userperms._default) {
          // console.log(2);
          if (message._.userperms._default || c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user)) {
            // console.log(3);
            command.exec(j_, j);
            if ((command.cooldown > 0 || command.cooldown_user > 0) && !message._.userperms._default) {
              _cooldown(1, message.channel.id, commandid, message.userstate.id, true)
              .then(c2 => { })
              .catch(e => { throw e });
            }
          }
        }
      })
    } else {
      if (message._.userperm.num > j.c().perm.bot && command.send_msg_noperm) {
        let required_perm = await _permission(0, command.permission);
        j_.send(`Error: You don't have permission to perform that action (required: ${((required_perm.name ?? undefined) ? required_perm.name : required_perm.desc)})`);
      }
    }
  }
};

module.exports = commandhandler;