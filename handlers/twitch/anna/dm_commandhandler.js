const _permission = require("../../../functions/twitch/_permission");

async function dm_commandhandler(j_, response){
    let j = require("../../../variables/j");
    let commands = j.anna_dm_commands();
    if (Object.keys(commands).includes(j_.message._.command)) {
        let command = commands[j_.message._.command];
        // let commandid = (Object.keys(commands).includes(j_.message._.command) ? `${j_.message.channel.id}_${command.id}` : command.id);
        
        if ([1].includes(command.state)) {
            if (parseInt(j_.message._.userperm.num) >= j.c().anna.perm) {
                commands[j_.message._.command].exec(j_, response);
                // _cooldown(0, j_.message.channel.id, commandid, j_.message.userstate.id, false)
                // .then((c) => {
                //     if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || j_.message._.userperms._default){
                //         if(c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user) || j_.message._.userperms._default){
                //             (async () => {
                //                if(command.cooldown > 0 || command.cooldown_user > 0){
                //                    _cooldown(1, j_.message.channel.id, commandid, j_.message.userstate.id, true)
                //                    .then(c2 => {})
                //                    .catch(e => {throw e});
                //                }
                //             })();
                //         }
                //     }
                // })
            
            } else {
                if(j_.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
                    let required_perm = await _permission(0, command.permission);
                    j_.send(`Error: You don't have permission to perform that action (required: ${((required_perm.name ?? undefined) ? required_perm.name : required_perm.desc)})`);
                }
            }
        }
    }
};

module.exports = dm_commandhandler;