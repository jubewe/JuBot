const _rf = require("../../../functions/_rf");

module.exports = (req, res, next) => {
    let admin_logins = _rf("./modules/express/auth/admin_logins.json", true);
    let _existsreq = (req.headers.username && req.headers.password) || false;
    let _isadmin = (_existsreq && (Object.keys(admin_logins).includes(req.headers.username) && admin_logins[req.headers.username] === req.headers.password))  || false;
    req._permissions = {
        "_owner": false,
        "_admin": _isadmin
    };
    next();
};