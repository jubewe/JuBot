const { rf, log } = require("./functions/_");

function _init(){
    let j = require("./variables/j");
    process.on("unhandledRejection", () => {});
    
    j.client.connect();
    
    j.client.on("ready", () => {
        log(1, "Main-Client Connected");
    });

    j.join = require("./functions/join");
    j.join(rf(j.paths().channels, true).channels);

    j.client.on("error", (e) => {
        new Error(e);
    });

    j.send = require("./functions/send");
}

module.exports = _init;