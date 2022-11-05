/**
 * 
 * @param {object} userperm 
 * @returns {object}
 */

async function userperms(j_, j){
  j = j || require("../variables/j");
  return {
    "_bot":(j_.message._.userperm.num == j.c().perm.bot),
    "_default":(j_.message._.userperm.num == j.c().perm.botdefault),
    "moderator":(j_.message._.userperm.num == j.c().perm.moderator),
    "moderator_":(j_.message._.userperm.num >= j.c().perm.moderator),
    "broadcaster":(j_.message._.userperm.num == j.c().perm.broadcaster),
    "broadcaster_":(j_.message._.userperm.num >= j.c().perm.broadcaster),
    "_default":(j_.message._.userperm.num >= j.c().perm.botdefault),
    "_high":(j_.message._.userperm.num >= j.c().perm.bothigh),
    "_owner":(j_.message._.userperm.num == j.c().perm.botowner)
  };
};

module.exports = userperms;