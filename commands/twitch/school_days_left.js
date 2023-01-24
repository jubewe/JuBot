let j = require("../../variables/j");
const school_days_left = require("../../functions/twitch/school_days_left");
const _cleantime = require("../../functions/_cleantime");

module.exports = {
    name: "school_days_left",
    id: "global_commands_school_days_left",
    aliases: [],
    state: 1,
    add_version: "0.2.1",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        j_.send(`Just ${_cleantime(school_days_left(), 4).time.join(" and ")} left COPIUM`);
    }
};