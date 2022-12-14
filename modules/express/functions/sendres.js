const _log = require("../../../functions/_log");

/**
 * 
 * @param {any} res 
 * @param {number} status 
 * @param {string} data 
 * @param {boolean} noreturn 
 * @returns 
 */

function sendres(res, status, data, noreturn){
    data.status = status;
    res.statusCode = status;
    data = (typeof data === "object" ? JSON.stringify(data) : data);
    res.send(data);
    _log(0, `-> ${data}`);
    if(!noreturn) return;
};

module.exports = sendres;