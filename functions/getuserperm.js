const permission = require("./_permission");

function getuserperm(guuser){
    guuser = guuser.toString();
    let j = require("../variables/j");
    let permissions = j.files().permissions;

    if(Object.keys(permissions.users).includes(guuser)){
        return permission(0, permissions.users[guuser]);
    } else {
        return permission(0, j.c().perm.default);
    }
};

module.exports = getuserperm;