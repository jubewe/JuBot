const _regex = require("../../functions/_regex");
const _splitafter = require("../../functions/_splitafter");
const _usertoken = require("../functions/twitch/_usertoken");
let j = require("../../variables/j");

module.exports = {
    name: "crossban",
    id: "global_commands_crossban",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        if(!j_.message._.args()[0]) return j_.send(2, `Error: No user(s) given`);

        let cbusers = (j_.message._.args()[0].includes(",") ? j_.message._.args()[0].split(",") : [j_.message._.args()[0]]);
        let cblength = 600;
        let cboption = "ban";
        let cbreason = "[Automated by JuBot]";
        let cbnum = 1;

        if(j_.message._.args()[cbnum] && _regex.t_actionreg().test(j_.message._.args()[cbnum])) cboption = j_.message._.args()[cbnum]; cbnum++;
        if(["timeout"].includes(cboption) && j_.message._.args()[cbnum] && _regex.timeregall().test(j_.message._.args()[cbnum])) cblength = j_.message._.args()[cbnum]; cbnum++;
        if(j_.message._.args()[cbnum]) cbreason = _splitafter(j_.message._.msg, cbnum+1); cbnum++;

        _usertoken(0, j_.message.userstate.id)
        .then(utoken => {
            // ban in channels
        })
        .catch(e => {

        })

        j_.send(2, `WrapItUp`);
        
    }
}