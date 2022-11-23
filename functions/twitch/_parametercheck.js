/**
 * 
 * @param {object} j_ 
 * @param {object | array} parameters 
 * @returns {boolean}
 */

function _parametercheck(j_, parameters){
    if(parameters.length > 0){
        if(parameters.includes("channel")) if(j_.message._.chan) parameters.splice(parameters.indexOf("channel"), 1, true); else parameters.splice(parameters.indexOf("channel"), 1, false);

        return parameters.includes(false) ? false : true;
    } else {
        return true;
    }
};

module.exports = _parametercheck;