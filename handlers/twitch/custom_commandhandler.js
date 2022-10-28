const customcommand = require("../../functions/customcommand");
const getuserperm = require("../../functions/getuserperm");
const _cooldown = require("../../functions/_cooldown");

async function custom_commandhandler(j){
    j = j || require("../../variables/j");

    customcommand(0, j, false, null, null, j.message._.command)
    .then(command => {
        if(command.path) return;
        if ([1].includes(command.state)) {
            if (parseInt(j.message._.userperm.num) >= command.permission) {
                _cooldown(0, j.message.channel.id, command.id, j.message.userstate.id, false)
                .then((c) => {
                    if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || j.message._.userperms._default){
                        if(j.message._.userperms._default || c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user)){
                            (async () => {
                                j.send(0, j, command.response, undefined, undefined, undefined, true);
                                if(command.cooldown > 0 || command.cooldown_user > 0){
                                    _cooldown(1, j.message.channel.id, command.id, j.message.userstate.id, true)
                                    .then(c2 => {})
                                    .catch(e => {throw e});
                                }
                            })();
                        }
                    }
                })
                .catch(e => {
                    console.error(new Error(e))
                })
            } else {
                if(j.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
                    j.send(2, null, `Error: You don't have permission to perform that action (required: ${getuserperm(j.message.userstate.id).num})`);
                }
            }
        }
    })
    .catch(e => {
        console.error(e);
    })
};

module.exports = custom_commandhandler;