const c_j_ = require("../../classes/twitch/j_");
const getuserperm = require("../../functions/twitch/getuserperm");
const _cooldown = require("../../functions/twitch/_cooldown");
const _permission = require("../../functions/twitch/_permission");

/**
 * @param {c_j_} j_ 
 */
async function commandhandler(j_) {
  let j = require("../../variables/j");

  let commands = j.commands();
  let message = j_.message;
  
  if(!j.commands()[j_.message._.command]) return;

  let command = commands[message._.command]; 
  let commandid = command.id;
  
  if ([1].includes(command.state)) {
    if (parseInt(message._.userperm.num) >= command.permission) {
      _cooldown(0, message.channel.id, commandid, message.userstate.id, false)
      .then((c) => {
        if (c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || message._.userperms._default) {
          if (((Date.now() - c[0]) >= (command.cooldown_user)) || message._.userperms._default) {
            command.exec(j_);
            if (!message._.userperms._default) {
              _cooldown(1, message.channel.id, commandid, message.userstate.id, true)
            }
          }
        }
      })
      .catch();
    } else {
      if (message._.userperm.num > j.c().perm.bot && command.send_msg_noperm) {
        let required_perm = await _permission(0, command.permission);
        j_.send(`Error: You don't have permission to perform that action (required: ${((required_perm.name ?? undefined) ? required_perm.name : required_perm.desc)})`);
      }
    }
  }
};

module.exports = commandhandler;