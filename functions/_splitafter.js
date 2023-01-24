/**
 * 
 * @param {string} str 
 * @param {number} indexfrom
 * @returns {string}
 */

function _splitafter(str, indexfrom, splitter){
    if(!str) return null;
    indexfrom = indexfrom || 1;
    splitter = splitter || " ";
    return str.split(splitter).splice(indexfrom).join(splitter);
};

module.exports = _splitafter;