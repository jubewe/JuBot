let j = require("../variables/j");

function _checkenv(checkenv, checkvar, checkopt, checkval){
    j = require("../variables/j");

    let nonarr = j.variables().nonarr;
    let e = (nonarr.includes(checkenv) ? j.e() : checkenv);
    
    try {
        if(!nonarr.includes(checkopt)){
            if(["includes", 0].includes(checkopt)){
                if(!nonarr.includes(e[checkvar]) && e[checkvar].includes(checkval)){
                    return true;
                } else {
                    return false;
                }
            } else if(["===", 1].includes(checkopt)){
                if(!nonarr.includes(e[checkvar]) && e[checkvar] === checkval){
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            if(!nonarr.includes(e[checkvar]) && e[checkvar] === checkval){
                return true;
            } else {
                return false;
            }
        }
    } catch(e){
        throw new Error(e);
        return false;
    }
};

module.exports = _checkenv;