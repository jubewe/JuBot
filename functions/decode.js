/**
 * @param {Uint8Array} arr 
 * @returns {string}
 */

function decode(arr){
    return new TextDecoder("utf-8").decode(new Uint8Array(arr.match(/\d{3}/g).map(a => {return parseInt(a)})));
};

module.exports = decode;