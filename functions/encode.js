/**
 * @param {string} text 
 * @returns {Uint8Array}
 */

function encode(text){
    return [...new TextEncoder().encode(text)].map(t => {return "0".repeat(3-t.toString().length) + t}).join("");
};

module.exports = encode;