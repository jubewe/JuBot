const getuserperm = require("../../functions/getuserperm");
const _cooldown = require("../../functions/_cooldown");

function commandhandler(j_, j) {
    let [commands, message] = [j.commands(), j_.message];
    let [command, commandid] = [commands[message._.command], (Object.keys(commands).includes(message._.command) ? `${message.channel.id}_${command.id}` : command.id)];

    if ([1].includes(command.state)) {
        if (parseInt(message._.userperm.num) >= command.permission) {
            _cooldown(0, message.channel.id, commandid, message.userstate.id, false)
                .then((c) => {
                    if (c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || message._.userperms._default) {
                        if (message._.userperms._default || c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user)) {
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
                j.send(2, j_, `Error: You don't have permission to perform that action (required: ${getuserperm(message.userstate.id).num})`);
            }
        }
    }
};

module.exports = commandhandler;
