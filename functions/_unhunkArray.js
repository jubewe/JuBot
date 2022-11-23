/**
 * 
 * @param {array} array 
 * @see https://github.com/NuroC/moomoo-in-depth/tree/main/protocol#chunk-arrays
 * @returns {any}
 */

function _unchunkArray(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result = result.concat(array[i]);
    }
    return result;
};

module.exports = _unchunkArray;