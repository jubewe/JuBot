function _checkenv(checkenv, checkvar, checkopt, checkval){
    let nonarr = [null, undefined];
    let e = (nonarr.includes(checkenv) ? process.env : checkenv);
    
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
    }
};

module.exports = _checkenv;