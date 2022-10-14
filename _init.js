const { request } = require("http");
const api_requestheaders = require("./functions/api/api_requestheaders");
const { _rf, log } = require("./functions/_");
const _error = require("./functions/_error");
const _executetimers = require("./functions/_executetimers");
const _log = require("./functions/_log");
const _stackname = require("./functions/_stackname");
const urls = require("./variables/urls");
let queuedreconnect = -1;

function _init(){
    let j = require("./variables/j");
    console.clear();

    process.on("unhandledRejection", (rej) => {
        _error(rej)
        // console.error(new Error(rej));
    });
    
    j.client.connect();
    j.viewclient.connect();

    j.client.on("ready", () => {
        log(1, `${_stackname("client", "connect")[3]} Successful`);
    });

    j.viewclient.on("ready", () => {
        log(1, `${_stackname("viewclient", "connect")[3]} Successful`);
    });

    j.client.on("error", error => {
        if(error){
            _log(2, `${_stackname("client", "error")[3]}: ${error.message}`);
            if(error.message.toLowerCase().includes("connection closed due to error")){
                if(queuedreconnect <= 0){
                    reconnect();
                }
            }
        }
    });
    
    j.viewclient.on("error", (e) => {
        console.error(new Error(e));
    });

    j.client.on("close", () => {
        _log(2, `${_stackname("client", "close")[3]}`);
        setTimeout(() => {
            reconnect();
        }, 10000);
    });

    function reconnect(){
        _log(1, `${_stackname("client", "reconnect")[3]} Called`);
        if(j.client.connected){
            _log(1, `${_stackname("client", "reconnect")[3]} Already connected`);
            return;
        }
        if(queuedreconnect > -1) return;
        queuedreconnect = 0;
        attemptreconnect();
        let recint = setInterval(() => {
            attemptreconnect();
        }, 15000);

        function attemptreconnect(){
            queuedreconnect++;
            try {
                _log(1, `${_stackname("client", "reconnect")[3]} Triggered`);
                j.client.connect()
                .then(() => {
                    _log(1, `${_stackname("client", "reconnect")[3]} Successfully Reconnected after ${queuedreconnect} attempts`);
                    j.viewclient.connect();
                    queuedreconnect = -1;
                    clearInterval(recint);
                    return;
                })
                .catch(e => {
                    console.error(new Error(e));
                })
            } catch(e) {
                console.error(new Error(e));
                _log(2, `${_stackname("client", "reconnect")[3]} Reconnecting failed (${queuedreconnect}. attempt)`);
            }

            if(queuedreconnect >= 3){
                _log(2, `${_stackname("client", "reconnect")[3]} Restarting process after ${queuedreconnect} failed reconnection attempts`);
                setTimeout(() => {
                    process.exit();
                }, 1000);
            }
        };
    };

    j.join(_rf(j.paths().clientchannels, true).channels);
    
    // j.join(_rf(j.paths().clientchannels, true).viewchannels, j.viewclient, "viewchannels");
    
    j.send = require("./functions/send");
    // j.commands = require("./commands/_");

    _executetimers();
    log(1, `${_stackname("timers")[3]} Executed`);

    setInterval(reconnect, 1800000);

    getapierrors();
    setInterval(getapierrors, 1800000);

    function getapierrors(){
        request(`${urls.api.__url("error", "GET")}`, {method: "GET", headers: api_requestheaders()}, (e, r) => {
            if(e){
                console.error(new Error(e));
            } else {
                let dat = r.body;
                _log(1, `${_stackname("api", "get", "errors")}: ${dat.length}`);
                if(dat.length > 0){
                    j.send(0, j.env().T_USERNAME, `@JUBOT_ADMIN, Cached ${dat.split("\n").length} Errors ( ${urls.api._base}:${urls.api._port}${urls.api.error} )`);
                }
            }
        })
    };

    // _error(new Error("test"))
}

module.exports = _init;