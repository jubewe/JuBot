/**
 * 
 * @param {any} val 
 * @param {any} returntrue if nonarr includes val
 * @param {any} returnfalse if nonarr does not include val
 */

function _nonarr(val, returntrue, returnfalse){
    if([undefined, null].includes(val)){
        return returntrue || true;
    } else {
        return returnfalse || val;
    }
};

module.exports = _nonarr;