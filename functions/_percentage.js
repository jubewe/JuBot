const nonarr = [null, undefined];

/**
 * 
 * 0: c * b, 1: b of a, 2: c% of a
 * @param {number | null} a full value
 * @param {number | null} b part value
 * @param {number | null} c percentage
 */

function _percentage(a, b, c, fixednum){
    fixednum = (fixednum ?? 2);
    if(nonarr.includes(a) && b && c){
        return ((b/c)*100).toFixed(fixednum);
    } else if(a && nonarr.includes(b) && c){
        return ((a/100)*c).toFixed(fixednum);
    } else if(a && b && nonarr.includes(c)){
        return Math.abs((a-b)/a*100).toFixed(fixednum);
    } else {
        return null;
    }
};

module.exports = _percentage;