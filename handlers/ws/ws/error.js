const _log = require("../../../functions/_log");

/**
 * @param {Error} error 
 */

module.exports = (error) => {
    _log(2, `[WS] [SERVER] [WS] [ERROR] \n\t${error}`);
};