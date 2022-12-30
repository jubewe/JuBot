/**
 * @param {object} userperm 
 * @returns {object}
 */

async function userperms(j_){
    let files = require("../../variables/files");
    let c = require("../../config.json");
    let perms = files.discord.permissions;
    let p = j_.message.response.memberPermissions;
    return {
        "_bot":(j_.message._.userperm.num == c.perm.bot),
        "moderator":(j_.message._.userperm.num == c.perm.moderator || haspermission(c.perm.moderator)),
        "moderator_":(j_.message._.userperm.num >= c.perm.moderator || haspermission(c.perm.moderator)),
        "_default":(j_.message._.userperm.num >= c.perm.botdefault),
        "_high":(j_.message._.userperm.num >= c.perm.bothigh || haspermission(c.perm.admin)),
        "_owner":(j_.message._.userperm.num == c.perm.botowner)
    };

    function getpermission(permnum){
        return Object.keys(perms.flags).filter(a => {return (perms.flags[a] === permnum);});
    };

    function haspermission(permnum){
        return (p ? p.has(getpermission(permnum)) : false);
    };
};

module.exports = userperms;