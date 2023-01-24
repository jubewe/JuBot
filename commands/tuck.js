let j = require("../variables/j");

module.exports = {
    name: "tuck",
    id: "global_commands_tuck",
    aliases: [],
    state: 1,
    add_version: "0.0.9",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: 5000,
    cooldown_user: 10000,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            j_.send(0, `${j_.message._.usertag} You tuck ${j_.message._.args()[0]} to Bed ${j_.message._.args()[1] || "OkayChamp"} 👉 🛌 Bedge`);
        } else {
            j_.send(0, `${j_.message._.usertag} You tuck someone to Bed OkayChamp 👉 🛌 Bedge`);
        }
    }
}