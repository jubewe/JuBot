const getuser = require("../functions/twitch/getuser");
const _permission = require("../functions/twitch/_permission");
const _pixelize = require("../functions/_pixelize");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");

module.exports = {
    name: "permission",
    id: "global_commands_permission",
    aliases: ["perm"],
    state: 1,
    add_version: "0.1.0",
    add_user: "jubewe",
    permission: j.c().perm.botowner,
    cooldown: -1,
    cooldown_user: -1,
    arguments:[ {name:"option",required:true,options:["add","get"]}],
    exec: async (j_) => {
        let permissions = j.files().permissions;

        switch (j_.message._.command){
            case "permission": {
                if(j_.message._.args()[0]){
                    let permopt = j_.message._.args()[0];
                    switch (permopt) {
                        case "add": case "set": {
                            setperm(1); break;
                        };
                        case "get": {
                            getperm(1); break;
                        };
                    }
                } else {
                    j_.send(`Error: No user given`);
                }

                break;
            }

            case "addperm": setperm(0); break;
            case "getperm": getperm(0); break;
        }

        function getperm(n){
            if(!j_.message._.args()[n]) return j_.send(`Error: No user given`);
            let permuser = j_.message._.args()[n];

            getuser(1, permuser)
            .then(u => {
                if(!permissions.users[u[1]]) return j_.send(`${_pixelize(u[0])}'s perm: 10 (Default)`);

                j_.send(`${_pixelize(u[0])}'s perm: ${permissions.users[u[1]]} (${(permissions.permissions[permissions.users[u[1]]] ? ((permissions.permissions[permissions.users[u[1]]].tag ?? undefined) ? permissions.permissions[permissions.users[u[1]]].tag[0] : (permissions.permissions[permissions.users[u[1]]].name ?? "No Description or Name")) : "No description")})`)
            })
            .catch(e => {
                j_.send(`Error: Could not get ${_pixelize(permuser)}: ${_returnerr(e,0)} ${_returnerr(e,1)}`)
            })
        };
        
        function setperm(n){
            if(!j_.message._.args()[n]) return j_.send(`Error: No user given`);
            if(!j_.message._.args()[n+1]) return j_.send(`Error: No perm given`);
            
            let permuser = j_.message._.args()[n];
            let permnum = j_.message._.args()[n+1];

            if(!isNaN(permnum) && Object.keys(permissions.permissions).includes(permnum)){
                getuser(1, permuser)
                .then(u => {
                    _permission(1, permnum, u[1])
                    .then(p => {
                        console.log(p);
                        j_.send(`Successfully set perm of ${_pixelize(permuser)} (${u[1]}) to ${permnum}`);
                    })
                    .catch(e => {
                        j_.send(`Error: Could not set perm of ${_pixelize(permuser)} (${u[1]}) to ${permnum}: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                    })
                })
                .catch(e => {
                    console.error(e);
                    j_.send(`Error: Could not get user: ${_returnerr(e, 0)} ${_returnerr(e, 1)}`);
                })
            } else {
                j_.send(`Error: Invalid perm-number`);
            } 
        };
    }
}