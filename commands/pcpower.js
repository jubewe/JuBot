const request = require("request");
const c_j_ = require("../classes/twitch/j_");
const getip = require("../functions/api/getip");
const _pickrandom = require("../functions/_pickrandom");
const _pi_gpio = require("../functions/_pi_gpio");
const _sleep = require("../functions/_sleep");
let j = require("../variables/j");
const urls = require("../variables/urls");

const pcpin = "24";

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
    /** @param {c_j_} j_ */
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
    
            async function pcon(){
                if(pc_state === 1) return j_.send(`Error: PC already on`);
                _pi_gpio("set", pcpin, "op", "dh");
                setTimeout(() => {
                    _pi_gpio("set", pcpin, "op", "dl");
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
    
            async function pcoff(){
                if(pc_state === 0) return j_.send(`Error: PC already off`);
                if(j_.message.senderUserID == 412150332){
                    switch (_pickrandom([...Array(2)])){
                        case 0: {
                            j_.message.reply(`NAHHH heute nicht mein Freund TriHard 7`);
                            await _sleep(3000);
                            j_.message.reply(`Just Kidding... EleGiggle`);
                            break;
                        }

                        case 1: {
                            j_.message.reply(`AINTNOWAY ists schon so spät?`);
                            await _sleep(1000);
                            break;
                        }
                    }
                };
                
                switch (_pickrandom([...Array(3)])){
                    case 0: {
                        j_.message.reply(`3...`);
                        await _sleep(500);
                        j_.message.reply(`2...`);
                        await _sleep(500);
                        j_.message.reply(`1... PauseMan`);
                        await _sleep(500);
                        j_.message.reply(`Shutdown`);
                        break;
                    }

                    case 1: {
                        j_.message.reply(`🔔 jubeweBonk`);
                        break;
                    }

                    case 2: {
                        j_.message.reply(`Bedge`);
                        break;
                    }
                }
                await _sleep(500);

                _pi_gpio("set", pcpin, "op", "dh");
                setTimeout(() => {
                    _pi_gpio("set", pcpin, "op", "dl");
                    j_.send(`Successfully put the PC to sleep Bedge`);
                    // j_.send(`Successfully simulated pressing the power button (-> off)`);
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