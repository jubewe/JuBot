async function dm_commandhandler(j){
    j = j || require("../../../variables/j");
    let commands = j.anna_dm_commands();
    if (Object.keys(commands).includes(j.message._.command)) {
        let command = commands[j.message._.command];
        // let commandid = (Object.keys(commands).includes(j.message._.command) ? `${j.message.channel.id}_${command.id}` : command.id);
        
        if ([1].includes(command.state)) {
            if (parseInt(j.message._.userperm.num) >= j.c().anna.perm) {
                commands[j.message._.command].exec();
                // _cooldown(0, j.message.channel.id, commandid, j.message.userstate.id, false)
                // .then((c) => {
                //     if(c[0] === 0 || command.cooldown <= 0 || ((Date.now() - c[0]) >= command.cooldown) || j.message._.userperms._default){
                //         if(c[1] === 0 || command.cooldown_user <= 0 || ((Date.now() - c[0]) >= command.cooldown_user) || j.message._.userperms._default){
                //             (async () => {
                //                if(command.cooldown > 0 || command.cooldown_user > 0){
                //                    _cooldown(1, j.message.channel.id, commandid, j.message.userstate.id, true)
                //                    .then(c2 => {})
                //                    .catch(e => {throw e});
                //                }
                //             })();
                //         }
                //     }
                // })
            
            } else {
                if(j.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
                    j.send(2, null, `Error: You don't have permission to perform that action (required: ${getuserperm(j.message.userstate.id).num})`);
                }
            }
        }
    }
};

module.exports = dm_commandhandler;