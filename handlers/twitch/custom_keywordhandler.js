const customkeyword = require("../../functions/twitch/customkeyword");
const getuserperm = require("../../functions/twitch/getuserperm");
const _cooldown = require("../../functions/twitch/_cooldown");
const _permission = require("../../functions/twitch/_permission");

async function custom_keywordhandler(j_){
    let j = require("../../variables/j");

    customkeyword(0, j_, false, null, null, j_.message._.keyword)
    .then(async (keyword) => {
        if(keyword.path) return;
        if ([1].includes(keyword.state)) {
            if (parseInt(j_.message._.userperm.num) >= keyword.permission) {
                _cooldown(0, j_.message.channel.id, keyword.id, j_.message.userstate.id, false)
                .then((c) => {
                    if(((Date.now() - c[0]) >= (keyword.cooldown ?? j.c().cooldowns.cooldown)) || (j_.message._.userperms._default && j_.message._.matches.ignorecooldown)){
                        if(((Date.now() - c[1]) >= (keyword.cooldown_user ?? j.c().cooldowns.user_cooldown)) || (j_.message._.userperms._default && j_.message._.matches.ignorecooldown)){
                            j.send(0, j_, keyword.response, undefined, undefined, undefined, true);
                            if(!(j_.message._.userperms._default && j_.message._.matches.ignorecooldown)){
                                _cooldown(1, j_.message.channel.id, keyword.id, j_.message.userstate.id, true)
                            }
                        }
                    }
                })
            } else {
                if(j_.message._.userperm.num > j.c().perm.bot && keyword.send_msg_noperm){
                    let required_perm = await _permission(0, keyword.permission);
                    j_.send(`Error: You don't have permission to perform that action (required: ${((required_perm.name ?? undefined) ? required_perm.name : required_perm.desc)})`);
                }
            }
        }
    })
    .catch()
};

module.exports = custom_keywordhandler;