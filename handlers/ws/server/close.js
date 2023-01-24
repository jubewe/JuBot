const _log = require("../../../functions/_log");
const _stackname = require("../../../functions/_stackname");

module.exports = () => {
    _log(0, `${_stackname("ws", "server", "close")[3]}`);
};