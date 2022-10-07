/**
 * 
 * @param {string} u Url
 * @returns {string} Encoded Url
 */

const _rf = require("../../functions/_rf");

function encoder(u){
    let endecoder = _rf("./express/data/endecoder.json", true);
    Object.keys(endecoder).forEach(edc => {
        u = u.replace(new RegExp(`(${edc})`, "g"), endecoder[edc]);
    });

    return u;
};

module.exports = encoder;