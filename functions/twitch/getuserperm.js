let j = require("../../variables/j");
let files = require("../../variables/files");
const permission = require("./_permission");

function getuserperm(guuser){
    guuser = guuser.toString();

    if(Object.keys(files.permissions.users).includes(guuser)){
        return permission(0, files.permissions.users[guuser]);
    } else {
        return permission(0, j.c().perm.default);
    }
};

module.exports = getuserperm;