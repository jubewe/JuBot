const _log = require("../../_log");
const _stackname = require("../../_stackname");

async function _reconnect(j){
    _log(1, `${_stackname("client", "reconnect")[3]} Called`);
    if(!j.c().connect.twitch) {j.variables().queuedreconnect = -1; return;};
    if(j.client.connected){
        _log(1, `${_stackname("client", "reconnect")[3]} Already connected`);
        return;
    }
    if(j.variables().queuedreconnect > -1) return;
    j.variables().queuedreconnect = 0;
    attemptreconnect();
    let recint = setInterval(() => {
        attemptreconnect();
    }, 15000);

    function attemptreconnect(){
        j.variables().queuedreconnect++;
        try {
            _log(1, `${_stackname("client", "reconnect")[3]} Triggered`);
            j.client.connect()
            .then(() => {
                _log(1, `${_stackname("client", "reconnect")[3]} Successfully Reconnected after ${j.variables().queuedreconnect} attempts`);
                if(j.c().connect.twitch_view) j.viewclient.connect();
                j.variables().queuedreconnect = -1;
                clearInterval(recint);
                return;
            })
            .catch(e => {
                console.error(new Error(e));
            })
        } catch(e) {
            console.error(new Error(e));
            _log(2, `${_stackname("client", "reconnect")[3]} Reconnecting failed (${j.variables().queuedreconnect}. attempt)`);
        }

        if(j.variables().queuedreconnect >= 3){
            _log(2, `${_stackname("client", "reconnect")[3]} Restarting process after ${j.variables().queuedreconnect} failed reconnection attempts`);
            setTimeout(() => {
                process.exit();
            }, 1000);
        }
    };
};

module.exports = _reconnect;