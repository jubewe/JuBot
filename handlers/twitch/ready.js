const _log = require("../../functions/_log");
const _stackname = require("../../functions/_stackname");
let j = require("../../variables/j");

module.exports = () => {
    _log(1, `${_stackname("client", "connect")[3]} Successful`);
    if(j.files().startup.reconnect){
        j.send(0, j.e().T_USERNAME, `Successfully reconnected`);
        j.files().startup.reconnect = false;
    };    
};