const _regex = require("../../functions/_regex");
const _dc_error = require("../../functions/discord/_dc_error");
let j = require("../../variables/j");

module.exports = {
    name: "bulkdelete",
    id: "discord_global_commands_bulkdelete",
    aliases: [],
    state: 1,
    add_version: "0.2.0",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    description: "Bulk deletes messages in channel",
    arguments: [
        {
            type: 1,
            name: "Number",
            description: "Number of Messages to delete",
            required: false
        }
    ],
    exec: async (j_) => {
        if(j_.message._.userperms._high){
            let bulknumber = 10;
            if(j_.message._.args()[0] && _regex.numregex().test(j_.message._.args()[0])) bulknumber = j_.message._.args()[0];
            bulknumber = (bulknumber > 100 ? 100 : bulknumber);
            j_.message.response.channel.bulkDelete(bulknumber)
            .then(b => {
                if(b.size > 1) return j_.send(`Successfully deleted ${b.size} ${(b.size !== bulknumber ? `(of ${bulknumber})` : "")} messages`);
                j_.send(`No messages to delete found`)
            })
            .catch(e => {
                _dc_error(j_.message.channel.id, e, j_.message.response);
            })
        }
    }
};