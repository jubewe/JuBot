const paths = require("../variables/paths");
const permission = require("./_permission");
const syncfile = require("./_syncfile");

function getuserperm(guuser){
    guuser = guuser.toString();
    let j = require("../variables/j");
    let permissions = syncfile(5, paths.permissions);

    if(Object.keys(permissions.users).includes(guuser)){
        return permission(0, permissions.users[guuser]);
    } else {
        return permission(0, j.c().perm.default);
    }
};

module.exports = getuserperm;