const { _rf, log } = require("./functions/_");
const _executetimers = require("./functions/_executetimers");
const _log = require("./functions/_log");
let queuedreconnect = -1;

function _init(){
    let j = require("./variables/j");
    process.on("unhandledRejection", () => {});
    console.clear();
    
    j.client.connect();
    
    j.viewclient.connect();

    j.client.on("ready", () => {
        log(1, `Main-Client Connected`);
    });

    j.viewclient.on("ready", () => {
        log(1, `View-Client Connected`);
    });

    j.client.on("error", error => {
        if(error){
            _log(2, `Error: ${error.message}`);
            if(error.message.toLowerCase().includes("connection closed due to error")){
                if(queuedreconnect <= 0){
                    reconnect();
                }
            }
        }
    });

    async function reconnect(){
        if(queuedreconnect > -1) return;
        queuedreconnect = 0;
        attemptreconnect();
        recint: setInterval(() => {
            attemptreconnect();
        }, 15000);

        function attemptreconnect(){
            queuedreconnect += 1;
            try {
                j.client.connect()
                .then(() => {
                    _log(1, `Successfully Reconnected after ${queuedreconnect} attempts`);
                    j.viewclient.connect();
                    queuedreconnect = -1;
                    clearInterval(recint);
                })
            } catch(e) {
                _log(2, `Reconnecting failed (${queuedreconnect}. attempt)`);
            }

            if(queuedreconnect >= 2){
                _log(2, `Restarting process after ${queuedreconnect} failed reconnection attempts`);
                process.exit();
            }
        };
    };


    j.join(_rf(j.paths().clientchannels, true).channels);
    
    // j.join(_rf(j.paths().clientchannels, true).viewchannels, j.viewclient, "viewchannels");
    
    j.client.on("error", (e) => {
        new Error(e);
    });
    
    j.viewclient.on("error", (e) => {
        new Error(e);
    });

    j.send = require("./functions/send");

    _executetimers();
    log(1, "Executed timers");
}

module.exports = _init;