/**
 * 
 * @param {object} userperm 
 * @returns {object}
 */

async function userperms(j){
  j = j || require("../variables/j");
  return {
    "_bot":(j.message._.userperm.num == j.c().perm.bot),
    "_default":(j.message._.userperm.num == j.c().perm.botdefault),
    "moderator":(j.message._.userperm.num == j.c().perm.moderator),
    "moderator_":(j.message._.userperm.num >= j.c().perm.moderator),
    "broadcaster":(j.message._.userperm.num == j.c().perm.broadcaster),
    "broadcaster_":(j.message._.userperm.num >= j.c().perm.broadcaster),
    "_default":(j.message._.userperm.num >= j.c().perm.botdefault),
    "_high":(j.message._.userperm.num >= j.c().perm.bothigh),
    "_owner":(j.message._.userperm.num == j.c().perm.botowner)
  };
};

module.exports = userperms;