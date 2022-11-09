/**
 * 
 * @param {object} obj 
 * @param {any} val 
 * @returns {boolean}
 */

function _checkvalinobj(obj, val){
    return (Object.keys(obj).includes(val));
};

module.exports = _checkvalinobj;