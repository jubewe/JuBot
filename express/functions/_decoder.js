/**
 * 
 * @param {string} u Url
 * @returns {string} Decoded Url
 */

// const _mainpath = require("../../functions/_mainpath");
const _rf = require("../../functions/_rf");

function decoder(u){
    let endecoder = _rf("./express/data/endecoder.json", true);
    Object.values(endecoder).forEach(edc => {
        u = u.replace(new RegExp(`(${edc})`, "g"), Object.keys(endecoder)[Object.values(endecoder).indexOf(edc)]);
    });

    return u;
};

module.exports = decoder;