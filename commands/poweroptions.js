const _checkenv = require("../functions/_checkenv");
const _returnerr = require("../functions/_returnerr");
const _wf = require("../functions/_wf");
let j = require("../variables/j");
const { j_api_headeradmin } = require("../variables/vars");

module.exports = {
    name: "poweroptions",
    id: "global_commands_poweroptions",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        switch (j_.message._.command){
            case "restart": {
                if(!j_.message._.args()[0] || ["bot", "jubot"].includes(j_.message._.args()[0])){
                    if(_checkenv(null, "OS", 0, "Windows_NT")){
                        j_.send(`Error: Restart not possible on windows, exiting process`);
                        setTimeout(() => {
                            process.exit(0);
                        }, 1000);
                    } else {
                        j.files().startup.reconnect = true;
                        _wf(j.paths().startup, j.files().startup);
                        j_.send(`Attempting reconnect`)
                        setTimeout(() => {
                            require("child_process").execSync(`pm2 flush j && pm2 restart j`);                        
                        }, 1000);
                    }
                } else {
                    switch (j_.message._.args()[0]){
                        case "api": {
                            j.modules.request(`${j.urls().api._base}:${j.urls().api._port}/restart`, {headers: j_api_headeradmin()}, (e, r) => {
                                if(e) return j_.send(`Error: Could not restart API: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
                                console.log(r.body);
                                let dat = JSON.parse(r.body);
                                if(dat.status == 200){
                                    j_.send(`Successfully restarted API`);
                                } else {
                                    j_.send(`Error: Could not restart API: ${dat.data || "[No response body]"}`);
                                }
                            });

                            break;
                        }

                        case "ws": {
                            if(j.c().connect.ws.api){
                                j.ws.client.close();
                                j.ws.client = new j.modules.ws.WebSocket(`ws://${j.urls().api._base.replace("http://", "")}:${j.urls().ws._port}`);
                                j.ws.client.send(JSON.stringify({"type":"connect","name":"jubot","led_pin":j.c().raspi.led_pin}));
                                j_.send(`Successfully re-created websocket`);
                            } else {
                                j_.send(`Error: Websocket connect is false`);
                            }

                            break;
                        }
                        
                        default: {
                            j_.send(`Error: Option not found`);
                        }
                        
                    }
                }

                break;
            }

            default: {
                j_.send(`Error: Command defined but not found OhNo`);
            }
        }
    }
}