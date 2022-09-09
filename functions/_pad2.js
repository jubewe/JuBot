/**
 * 
 * @param {number} n 
 * @returns {number}
 */

function pad2(n){
    return n < 10 ? '0' + n : n
};

module.exports = pad2;