const request = require("request");
const api_requestheaders = require("../functions/api/api_requestheaders");
const getip = require("../functions/api/getip");
const _pi_gpio = require("../functions/_pi_gpio");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");
const urls = require("../variables/urls");

module.exports = {
    name: "pcpower",
    id: "global_commands_pcpower",
    aliases: [],
    state: 1,
    add_version: "0.2.1",
    add_user: "jubewe",
    permission: j.c().perm.botcoowner,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        async function pingpc(){
            return new Promise((resolve) => {
                try {
                    this.pc_ping = require("child_process").execSync(`ping ${getip("pc")} -c 1 -W 3`);
                    return resolve(this.pc_ping.toString("utf-8"));
                } catch(e){
                    return resolve(null);
                }
            });
        };

        pingpc()
        .then(p => {
            let pc_state = ((p ?? undefined) ? 1 : 0);

            switch (j_.message._.command){
                case "pcon": pcon(); break;
                case "pcoff": pcoff(); break;
            };

            let pcpin = "24";
    
            function pcon(){
                if(pc_state === 1) return j_.send(`Error: PC already on`);
                _pi_gpio("set", 24, "op", "dh");
                setTimeout(() => {
                    _pi_gpio("set", 24, "op", "dl");
                    j_.send(`Successfully simulated pressing the power button (-> on)`);
                }, 500);
                
                // request(urls.api.__url("pcpower", "POST"), {headers: api_requestheaders(), method: "POST"}, (e, r) => {
                //     if(e){
                //         j_.send(`Error: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                //         return console.error(e);
                //     };
        
                //     j_.send(`Successfully simulated pressing the power button (-> on)`);
                // });
            };
    
            function pcoff(){
                if(pc_state === 0) return j_.send(`Error: PC already off`);
                _pi_gpio("set", 24, "op", "dh");
                setTimeout(() => {
                    _pi_gpio("set", 24, "op", "dl");
                    j_.send(`Successfully simulated pressing the power button (-> off)`);
                }, 500);
                
                // request(urls.api.__url("pcpower", "POST"), {headers: api_requestheaders(), method: "POST"}, (e, r) => {
                //     if(e){
                //         j_.send(`Error: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                //         return console.error(e);
                //     };
        
                //     j_.send(`Successfully simulated pressing the power button (-> off)`);
                // });
            };
        });
    }
};