const logreq = require("../functions/logreq");

module.exports = (req, res, next) => {
    req.start = Date.now(); 
    logreq(req, res); 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Cache-Control");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    (async () => {next();})();
};