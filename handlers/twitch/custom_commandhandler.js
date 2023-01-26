const customcommand = require("../../functions/twitch/customcommand");
const getuserperm = require("../../functions/twitch/getuserperm");
const _cooldown = require("../../functions/twitch/_cooldown");
const _permission = require("../../functions/twitch/_permission");

async function custom_commandhandler(j_, j){
    j = j || require("../../variables/j");

    customcommand(0, j_, false, null, null, j_.message._.command)
    .then(async (command) => {
        if(command.path) return;
        if ([1].includes(command.state)) {
            if (parseInt(j_.message._.userperm.num) >= command.permission) {
                _cooldown(0, j_.message.channel.id, command.id, j_.message.userstate.id, false)
                .then((c) => {
                    if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || j_.message._.userperms._default){
                        if(j_.message._.userperms._default || c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user)){
                            j_.send(command.response, undefined, undefined, true);
                            if((command.cooldown > 0 || command.cooldown_user > 0) && !j_.message._.userperms._default){
                                _cooldown(1, j_.message.channel.id, command.id, j_.message.userstate.id, true)
                                .then(c2 => {})
                                .catch(e => {throw e});
                            }
                        }
                    }
                })
                .catch(e => {
                    console.error(new Error(e))
                })
            } else {
                if(j_.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
                    let required_perm = await _permission(0, command.permission);
                    j_.send(`Error: You don't have permission to perform that action (required: ${((required_perm.name ?? undefined) ? required_perm.name : required_perm.desc)})`);
                }
            }
        }
    })
    .catch(e => {
        console.error(e);
    })
};

module.exports = custom_commandhandler;