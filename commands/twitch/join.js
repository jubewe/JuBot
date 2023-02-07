const pixelize = require("../../functions/_pixelize");
const _returnerr = require("../../functions/_returnerr");
let j = require("../../variables/j");

module.exports = {
    name: "join",
    id: "global_commands_join",
    aliases: [],
    state: 1,
    add_version: "0.0.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    arguments: [{name:"joinchannel",required:true,options:["channel"]}],
    exec: async (j_) => {
        if(j_.message._.msg.split(" ")[1] !== undefined){
            let joinchan = j_.message._.msg.split(" ")[1].toLowerCase();
            j.join(joinchan)
            .then(jc => {
                if(jc.r.reject === 0){
                    j_.send(`Successfully joined ${pixelize(joinchan)}`);
                } else {
                    if(jc.r.reject === 0){
                        j_.send(`Error: Already in ${pixelize(joinchan)}`);
                    }
                }
            })
            .catch(e => {
                console.error(e);
                j_.send(`Error: Could not join ${pixelize(joinchan)} ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
            })
        } else {
            j_.send(`Error: No Channel given`);
        }
    }
}