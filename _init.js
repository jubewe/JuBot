const { rf, log } = require("./functions/_");
const _executetimers = require("./functions/_executetimers");

function _init(){
    let j = require("./variables/j");
    process.on("unhandledRejection", () => {});
    
    j.client.connect();
    
    j.client.on("ready", () => {
        log(1, "Main-Client Connected");
    });

    j.join(rf(j.paths().clientchannels, true).channels)

    j.client.on("error", (e) => {
        new Error(e);
    });

    j.send = require("./functions/send");

    _executetimers();
    log(1, "Executed timers");
}

module.exports = _init;