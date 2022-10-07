/**
 * 
 * @param {number} spacerwidth Number of tabs
 * @param {string} spacercontent 
 */

function _staticspacer(spacerwidth, spacercontent){
    let sw = spacerwidth*8;
    let s = sw - spacercontent.length;
    let sr = spacercontent;
    if(s > 0){
        let st = (s > 8 ? `\t`.repeat(Math.floor(s / 8)) : '');
        let ss = " ".repeat(s % 8);
        sr = sr + ss + st;
    }

    return sr;
};

module.exports = _staticspacer;