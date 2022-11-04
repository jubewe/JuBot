let nonarr = [null, undefined];

/**
 * 
 * @param {number | object | array} num 
 * @param {string | null | undefined} returnplural 
 * @param {string | null | undefined} returnsingular 
 * @returns {string}
 */

function _returnplural(num, returnplural, returnsingular){
    if(typeof num === "object"){
        if(Array.isArray(num)){
            num = num.length;
        } else {
            num = Object.keys(num).length;
        }
    }; 

    return (num > 1 ? (nonarr.includes(returnplural) ? "s" : returnplural) : (nonarr.includes(returnsingular) ? "" : returnsingular));
};

module.exports = _returnplural;