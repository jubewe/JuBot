/**
 * @returns {any} Script Uptime
 */

function uptime(){
    let j = require("../../variables/j");
    return j.functions()._cleantime(Date.now() - j.variables().starttime, 5, "auto").time;
};

module.exports = uptime;