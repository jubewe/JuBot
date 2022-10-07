const fs = require("fs");
const _decoder = require("./functions/_decoder");
const logreq = require("./functions/logreq");
const c = require("../express_config.json");
const sendres = require("./functions/sendres");
const _log = require("../functions/_log");
const path = require("path");

async function _initexpress(){
    let j = require("../variables/j");
    let limiters = require("./limiters");

    j.express.app.use((req, res, next) => {req.start = Date.now(); logreq(req, res); (async () => {next();})()});
    j.express.app.use(limiters._default);

    j.express.app.listen(c.port, c.address, () => {
        _log(1, `Express Started`);
    });

    j.express.app.use("/", (req, res) => {
        sendres(res, 200, {data: {path: path.dirname(__dirname), connections: j.client.connections.length, uptime: (Date.now()-j.variables().starttime)}});
    });
};

module.exports = _initexpress;