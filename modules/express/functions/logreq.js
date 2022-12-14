const _log = require("../../../functions/_log");

function logreq(req, res){
    _log(0, `${req.method}\t${req.url}`);
    // _log(0, `${req.headers["x-forwarded-to"] || req.socket.remoteAddress}`
    // +`\t${req.headers["user-agent"]}`);
};

module.exports = logreq;