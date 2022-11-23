const getuserperm = require("../../functions/getuserperm");
const _parametercheck = require("../../functions/twitch/_parametercheck");
const _cooldown = require("../../functions/_cooldown");

async function dm_commandhandler(j_, j) {
  j = j || require("../../variables/j");
  let commands = j.dm_commands();
  if (Object.keys(commands).includes(j_.message._.command)) {
    let command = commands[j_.message._.command];
    let commandid = (Object.keys(commands).includes(j_.message._.command) ? `${j_.message.channel.id}_${command.id}` : command.id);

    if ([1].includes(command.state)) {
      if(!command.parameters || _parametercheck(j_, command.parameters)){
        if (parseInt(j_.message._.userperm.num) >= command.permission) {
          _cooldown(0, j_.message.channel.id, commandid, j_.message.userstate.id, false)
          .then((c) => {
            if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || j_.message._.userperms._default){
              if(c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user) || j_.message._.userperms._default){
                (async () => {
                  commands[j_.message._.command].exec(j_, j);
                  if((command.cooldown > 0 || command.cooldown_user > 0) && j_.message._.userperms._default){
                    _cooldown(1, j_.message.channel.id, commandid, j_.message.userstate.id, true)
                    .then(c2 => {})
                    .catch(e => {throw e});
                  }
                })();
              }
            }
          })
  
        } else {
          if(j_.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
            j_.send(2, `Error: You don't have permission to perform that action (required: ${getuserperm(j_.message.userstate.id).num})`);
          }
        }
      } else {
        if(command.send_msg_nochan){
          j_.send(2, `Error: No channel specified`);
        }
      }
    }
  }
};

module.exports = dm_commandhandler;