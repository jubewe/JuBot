const customkeyword = require("../../functions/customkeyword");
const getuserperm = require("../../functions/getuserperm");
const _cooldown = require("../../functions/_cooldown");

async function custom_keywordhandler(j_, j){
    j = j || require("../../variables/j");

    customkeyword(0, j_, false, null, null, j_.message._.keyword)
    .then(keyword => {
        if(keyword.path) return;
        if ([1].includes(keyword.state)) {
            if (parseInt(j_.message._.userperm.num) >= keyword.permission) {
                _cooldown(0, j_.message.channel.id, keyword.id, j_.message.userstate.id, false)
                .then((c) => {
                    if(c[0] === 0 || keyword.cooldown <= 0 || ((Date.now() - c[0]) >= keyword.cooldown) || j_.message._.userperms._default){
                        if(j_.message._.userperms._default || c[1] === 0 || keyword.cooldown_user <= 0 || ((Date.now() - c[0]) >= keyword.cooldown_user)){
                            (async () => {
                                j_.send(0, j_, keyword.response, undefined, undefined, undefined, true);
                                if((keyword.cooldown > 0 || keyword.cooldown_user > 0) && j_.message._.userperms._default){
                                    _cooldown(1, j_.message.channel.id, keyword.id, j_.message.userstate.id, true)
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
                if(j_.message._.userperm.num > j.c().perm.bot && command.send_msg_noperm){
                    j_.send(2, j_, `Error: You don't have permission to perform that action (required: ${getuserperm(j_.message.userstate.id).num})`);
                }
            }
        }
    })
    .catch(e => {
        console.error(e);
    })
};

module.exports = custom_keywordhandler;