const _log = require("../../../functions/_log");
const _stackname = require("../../../functions/_stackname");

module.exports = () => {
    _log(1, `${_stackname("ws", "server", "listen")[3]}`);
};