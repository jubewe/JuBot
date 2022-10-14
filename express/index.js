const c = require("./config.json");
const sendres = require("./functions/sendres");
const _log = require("../functions/_log");
const path = require("path");

async function _initexpress(){
    let j = require("../variables/j");
    let limiters = require("./limiters");

    j.express.app.use(require("./use/req_perm"));
    j.express.app.use(require("./use/_default"));
    j.express.app.use(limiters._default);

    j.express.app.listen(c.port, () => {
        _log(1, `Express Started`);
    });

    j.express.app.use("/restart", (req, res) => {
        if(req._permissions._admin){
            sendres(res, 200, {data: `Successful`}, true);
            _log(2, `API Restart`);
            j.express.app.removeAllListeners();
            process.exit();
        } else {
            sendres(res, 499, {data: `Error: Invalid login`});
        }
    });

    j.express.app.use("/", (req, res) => {
        sendres(res, 200, {data: {path: path.dirname(__dirname), connections: j.client.connections.length, uptime: (Date.now()-j.variables().starttime)}});
    });

};

module.exports = _initexpress;