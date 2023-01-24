const _log = require("../../../functions/_log");
const _stackname = require("../../../functions/_stackname");

/**
 * @param {Error} error 
 */

module.exports = (error) => {
    _log(2, `${_stackname("ws", "server", "error")[3]}`);
    console.error(error);
};