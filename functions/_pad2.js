/**
 * 
 * @param {number} n 
 * @returns {number}
 */

function _pad2(n){
    return n < 10 ? '0' + n : n
};

module.exports = _pad2;