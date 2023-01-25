const c = require("./config.json");
const sendres = require("./functions/sendres");
const _log = require("../../functions/_log");
const path = require("path");
const _wf = require("../../functions/_wf");
const _rf = require("../../functions/_rf");
const paths = require("../../variables/paths");

async function _initexpress(){
    let j = require("../../variables/j");
    let limiters = require("./limiters");

    j.express.app.use(require("./use/req_perm"));
    j.express.app.use(require("./use/_default"));
    j.express.app.use(limiters._default);

    j.express.app.listen(c.port, () => {
        _log(1, `${j.functions()._stackname("express")[3]} Started`);
    });

    j.express.app.use("/restart", (req, res) => {
        if(req._permissions._admin){
            sendres(res, 200, {data: `Successful`}, true);
            _log(2, `${j.functions()._stackname("express")[3]} Restart Called`);
            j.express.app.removeAllListeners();
            if(j.dc.client) try {j.dc.client.destroy()} catch(e){};
            if(j.client) try {j.client.destroy()} catch(e){};
            if(j.viewclient) try {j.viewclient.destroy()} catch(e){};
            if(j.ws.client) try {j.ws.client.close()} catch(e){};
            j.files().startup.reconnect = true;
            _wf(j.paths().startup, j.files().startup, true);
            process.exit();
        } else {
            // if(req._sendhtml) return res.send(_rf(paths))
            sendres(res, 499, {data: `Error: Invalid login`});
        }
    });

    j.express.app.use("/", (req, res) => {
        sendres(res, 200, {data: {path: path.dirname(__dirname), uptime: (Date.now()-j.variables().starttime)}});
    });

};

module.exports = _initexpress;