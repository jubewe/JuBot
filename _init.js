const request = require("request");
const api_requestheaders = require("./functions/api/api_requestheaders");
const { _rf } = require("./functions/_");
const _error = require("./functions/_error");
const _executetimers = require("./functions/_executetimers");
const _log = require("./functions/_log");
// const _pi_blink = require("./functions/_pi_blink");
const _stackname = require("./functions/_stackname");
const c = require("./config.json");
const urls = require("./variables/urls");
let queuedreconnect = -1;
global.test = "test";
function _init(){
    let j = require("./variables/j");
    // console.clear();

    process.on("unhandledRejection", (rej) => {
        console.error(rej);
        _error(rej)
        // console.error(new Error(rej));
    });

    if(c.connect.twitch){j.client.connect(); j.join(_rf(j.paths().clientchannels, true).channels);};
    if(c.connect.twitch_view){j.viewclient.connect(); j.join(_rf(j.paths().clientchannels, true).viewchannels, j.viewclient, "viewchannels");};
    if(c.connect.discord){j.dc.client.login(j.e().DC_TOKEN);};

    j.client.on("ready", () => {
        _log(1, `${_stackname("client", "connect")[3]} Successful`);
        // setTimeout(() => {_pi_blink();setInterval(_pi_blink, 2000)}, ((Date.now().toString().slice(-5, -1))%10000))
    });

    j.viewclient.on("ready", () => {
        _log(1, `${_stackname("viewclient", "connect")[3]} Successful`);
    });

    j.dc.client.on("ready", () => {
        _log(1, `${_stackname("discord", "connect")[3]} Successful`);
    });

    j.client.on("error", error => {
        if(error){
            _log(2, `${_stackname("viewclient", "error")[3]} ${error.message}`);
            if(error.message.toLowerCase().includes("connection closed due to error")){
                if(queuedreconnect <= 0){
                    reconnect();
                }
            }
        }
    });
    
    j.viewclient.on("error", error => {
        if(error){_log(2, `${_stackname("client", "error")[3]} ${error.message}`);}
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
        // attemptreconnect();
        // let recint = setInterval(() => {
        //     attemptreconnect();
        // }, 15000);

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

    _executetimers();
    _log(1, `${_stackname("timers")[3]} Executed`);

    setInterval(reconnect, 1800000);

    setTimeout(getapierrors, 3000);
    setInterval(getapierrors, 1800000);

    function getapierrors(){
        request(`${urls.api.__url("errors", "GET")}`, {method: "GET", headers: api_requestheaders()}, (e, r) => {
            if(e){
                console.error(new Error(e));
            } else {
                if(j.functions().regex.jsonreg().test(r.body)){
                    let dat = JSON.parse(r.body);
                    _log(1, `${_stackname("api", "get", "errors")[3]} ${dat.data.split("\n").length-1}`);
                    if(dat.status == 200 && dat.data.length > 0){
                        j.send(0, j.env().T_USERNAME, `@JUBOT_ADMIN, Cached ${(dat.data.split("\n").length-1).toFixed(0)} Errors ( ${urls.api._base}:${urls.api._port}${urls.api._endpoints.GET.errors} / \\\\JUPI\\pi\\home\\pi\\FTP\\files\\api\\data\\errors.txt )`);
                    }
                } else {
                    _log(2, `${_stackname("api", "get", "errors", "error")[3]} ${r.body}`);
                }
            }
        })
    };

    // Reference: https://github.com/SevenTV/EventAPI/
    
    j.ws.client.on("open", e => {
        _log(1, `${_stackname("ws", "api")[3]} Connected`);
        j.ws.client.send(JSON.stringify({"type":"connect","name":"jubot","led_pin":c.raspi.led_pin}));
    });
    
    j.ws.client.on("close", e => {
        _log(2, `${_stackname("ws", "api")[3]} Closed`);
        let wsreconnectint = setInterval(() => {
            if(j.ws.client.readyState !== 1){
                j.ws.client.close();
                j.ws.client = new j.modules.ws.WebSocket(`ws://${j.urls().api._base.replace("http://", "")}:${j.urls().ws._port}`)
                _log(2, `${_stackname("ws", "api")[3]} Re-Created`);
            } else {
                _log(1, `${_stackname("ws", "api")[3]} Reconnected`);
                clearInterval(wsreconnectint);
            }
        }, 10000);
    });

    j.ws.client.on("error", e => {
        console.error(new Error(e));
        _log(2, `${_stackname("ws", "api")[3]} Error`);
    });

    j.ws.client.on("pong", p => {
        j.ws.client.pong(JSON.stringify({"type":"pong","start":p.start,"start_client":Date.now()}));
    });
}

module.exports = _init;