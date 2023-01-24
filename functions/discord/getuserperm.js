async function getuserperm(guuser){
    const permission = require("./_permission");
    let c = require("../../config.json");
    let files = require("../../variables/files");
    guuser = guuser.toString();

    if(Object.keys(files.discord.permissions.users).includes(guuser)){
        return permission(0, files.discord.permissions.users[guuser]);
    } else {
        return permission(0, c.perm.default);
    }
};

module.exports = getuserperm;