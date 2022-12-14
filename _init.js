global.test = "test";
global.variables = {
    varstatic: require("./variables/varstatic"),
    vars: require("./variables/vars")
};
global.functions = require("./functions/_");

const _error = require("./functions/_error");
const _executetimers = require("./functions/twitch/executetimers");
const _log = require("./functions/_log");
const _stackname = require("./functions/_stackname");
const c = require("./config.json");
const _checkenv = require("./functions/_checkenv");
const livechannels = require("./functions/trackers/livechannels");
const youtubevideo = require("./functions/trackers/youtubevideo");
let j = require("./variables/j");
const _mainpath = require("./functions/_mainpath");
const geterrors = require("./functions/api/geterrors");
const reconnect = () => {
    require("./functions/twitch/actions/_reconnect")(j);
};
j.variables().queuedreconnect = -1;

if(_checkenv(null, "OS", 0, "Windows_NT")){
    _log(1, `${_stackname("script", "test")[3]} executed`);
    require(_mainpath("./test.js"))();
};

async function _init(){
    let j = require("./variables/j");
    // console.clear();

    process.on("unhandledRejection", (rej) => {
        console.error(rej);
        if(!_checkenv(null, "OS", 0, "Windows_NT")) _error(rej);
    });

    if(c.connect.twitch){
        j.client.connect(); 
        j.join(j.files().clientchannels.channels, j.client, "channels");

        j.client.on("ready", () => require("./handlers/twitch/ready"));

        j.client.on("error", error => {
            if(error){
                _log(2, `${_stackname("client", "error")[3]} ${error.message}`);
                if(error.message.toLowerCase().includes("connection closed due to error")){
                    if(j.variables().queuedreconnect <= 0){
                        reconnect();
                    };
                };
            };
        });

        j.client.on("close", () => {
            _log(2, `${_stackname("client", "close")[3]}`);
            setTimeout(() => {
                reconnect();
            }, 10000);
        });

        setInterval(reconnect, j.c().intervals.reconnect.client);

        _executetimers();
        _log(1, `${_stackname("timers")[3]} Executed`);

        if(j.c().connect.trackers.activemods || j.c().connect.trackers.live){
            setTimeout(livechannels, 3000);
            setInterval(livechannels, j.c().intervals.trackers.activemods);
        };

        if(j.c().connect.trackers.youtube_video){
            setTimeout(youtubevideo, 3000);
            setInterval(youtubevideo, j.c().intervals.trackers.youtube_video);
        };
    };

    if(c.connect.twitch_view){
        j.viewclient.connect(); 
        j.join(j.files().clientchannels.viewchannels, j.viewclient, "viewchannels");

        j.viewclient.on("ready", () => {
            _log(1, `${_stackname("viewclient", "connect")[3]} Successful`);
        });

        j.viewclient.on("error", error => {
            if(error){_log(2, `${_stackname("viewclient", "error")[3]} ${error.message}`);}
        });
    };

    if(c.connect.discord){
        j.dc.client.login(j.e().DC_TOKEN);

        j.dc.client.on("ready", require("./handlers/discord/ready"));
        j.dc.client.on("messageCreate", require("./handlers/discord/messageCreate"));
        j.dc.client.on("interactionCreate", require("./handlers/discord/interactionCreate"));
        j.dc.client.on("error", require("./handlers/discord/error"));
    };

    if(c.connect.ws.server) require("./modules/ws/server/index")();
    if(c.connect.express.app) require("./modules/express/index")();
    if(c.connect.ws.seventv) require("./modules/seventv/seventv_ws")();

    if(!_checkenv(j.e(), "OS", 0, "Windows_NT")){
        setTimeout(() => {geterrors(1)}, 3000);
        setInterval(() => {geterrors(1)}, j.c().intervals.errors);
    };
    
    if(j.c().connect.ws.api){
        j.ws.client.on("open", () => {
            _log(1, `${_stackname("ws", "api")[3]} Connected`);
            j.ws.client.send(JSON.stringify({"type":"connect","name":"jubot","led_pin":c.raspi.led_pin}));
        });
        
        j.ws.client.on("close", e => {
            _log(2, `${_stackname("ws", "api")[3]} Closed`);
            let wsreconnectint = setInterval(() => {
                if(j.ws.client.readyState !== 1){
                    j.ws.client.close();
                    j.ws.client = new j.modules.ws.WebSocket(`ws://${j.urls().api._base.replace("http://", "")}:${j.urls().ws._port}`)
                    j.ws.client.send(JSON.stringify({"type":"connect","name":"jubot","led_pin":c.raspi.led_pin}));
                    _log(2, `${_stackname("ws", "api")[3]} Re-Created`);
                } else {
                    _log(1, `${_stackname("ws", "api")[3]} Reconnected`);
                    clearInterval(wsreconnectint);
                }
            }, (e == 1006 ? j.c().intervals.reconnect.ws : 30000));
            // ENETUNREACH  1006
        });
    
        j.ws.client.on("error", e => {
            console.error(new Error(e));
            _log(2, `${_stackname("ws", "api")[3]} Error`);
        });
    
        j.ws.client.on("pong", p => {
            j.ws.client.pong(JSON.stringify({"type":"pong","start":p.start,"start_client":Date.now()}));
        });
    };
};

module.exports = _init;