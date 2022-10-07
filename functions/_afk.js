const paths = require("../variables/paths");
const _rf = require("./_rf");

async function _afk(amode, auserid, amsg,){
    let j = require("../variables/j");
    let afks = _rf(paths.afkusers, true);
    switch (amode) {
        case 0: {
            if(!auserid) return null;

            if(Object.keys(afks.users).includes(auserid)){
                return afks.users[auserid];
            } else {
                return null;
            }

            break;
        }

        case 1: {
            if(!auserid) return null;
            amsg = (amsg ? amsg : "");

            afks.users[auserid] = {
                "message":""
            }

            break;
        }
    }
};

module.exports = _afk;