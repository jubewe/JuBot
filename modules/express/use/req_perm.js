const decode = require("../../../functions/decode");
const files = require("../../../variables/files");

module.exports = (req, res, next) => {
    let admin_logins = files.express.auth.admin_logins();
    let username = (req.headers.username ?? req.query.username ?? undefined);
    let password = (req.headers.password ?? req.query.password ?? undefined);
    let _existsreq = (username && password) || false;
    let _isadmin = (_existsreq && ((admin_logins[username] && admin_logins[username] === password) || (!isNaN(username) && !isNaN(password) && (admin_logins[decode(username)] === decode(password))))) || false;
    req._permissions = {
        "_owner": false,
        "_admin": _isadmin
    };
    req._isbrowser = (req.headers["user-agent"] ? true : false);
    req._sendhtml = (req._isbrowser && req.headers["response-type"] && req.headers["response-type"].toLowerCase() !== "json");
    next();
};