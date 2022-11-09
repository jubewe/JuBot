const nonarr = [null, undefined];

/**
 * 
 * @param {*} e 
 * @param {number} eopt 
 * @returns {string} String or Error
 */

function _returnerr(e, eopt){
    if(typeof e === "object" && !Object.keys(e)){
        /*if(j.lasterror !== e){
            j.lasterror = e;
            console.error(e);
        }*/
        if(!eopt) return e;
        if(eopt === 1) return `[Fatal Error: ${e.message}]`;
        return `Fatal Error: ${e.message}`
    } else {
        try {
            if(!nonarr.includes(eopt)){
                switch (eopt){
                    case 0:{
                        if(e.msg) return e.msg;
                        return "--";
                        break;
                    }
                    case 1:{
                        if(e.path) return `[Dev: ${e.path}]`;
                        return "[Error - e does not include key path]";
                        break;
                    }
                }
            } else {
                return e;
            }
        } catch(e){
            console.error(e);
            return "Fatal Code-Error";
        }
    }
};

module.exports = _returnerr;