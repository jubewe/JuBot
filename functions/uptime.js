/**
 * 
 * @returns {any} Script Uptime
 */

function uptime(){
    let j = require("../variables/j");
    return j.functions().cleantime(Date.now() - j.variables().starttime, 3, 2);
};

module.exports = uptime;