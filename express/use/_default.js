const logreq = require("../functions/logreq");

module.exports = (req, res, next) => {
    req.start = Date.now(); 
    logreq(req, res); 
    (async () => {next();})();
};