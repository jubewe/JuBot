const _log = require("../../../functions/_log");
const _stackname = require("../../../functions/_stackname");

module.exports = (headers) => {
    _log(0, `${_stackname("ws", "server", "headers")[3]}`);
    // console.log(headers);
};