const _log = require("../../functions/_log");
const _stackname = require("../../functions/_stackname");

module.exports = (error) => {
    let j = require("../../variables/j");
    const reconnect = () => {
        require("../../functions/twitch/actions/_reconnect")(j)
    };

    if(error){
        _log(2, `${_stackname("client", "error")[3]} ${error.message}`);
        if(error.message.toLowerCase().includes("connection closed due to error")){
            if(j.variables().queuedreconnect <= 0){
                reconnect();
            };
        };
    };
}