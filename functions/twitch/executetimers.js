let files = require("../../variables/files");
const getuser = require("./getuser");
const _cleantime = require("../_cleantime");
const _log = require("../_log");
let set_timers = [];
let j = require("../../variables/j");

/**
 * @param {string} tid 
 * @returns 
 */

function executetimers(tid){
    let timers = files.timers;

    if(tid){
        if(!set_timers.includes(tid)){
            settimer(tid);
        } 
    } else {
        for(i = 0; i < Object.keys(timers.times).length; i++){
            files.timers.times[Object.keys(timers.times)[i]].forEach(i2 => {
                settimer(i2);
            })
        }
        _log(1, `${j.functions()._stackname("timers", "set")[3]} ${set_timers.length}`);
    }

    function settimer(id){
        if(Object.keys(files.timers.ids).includes(id)){
            let tobj = files.timers.ids[id];
            if((tobj.time - Date.now()) < 1000){
                executetimer(id);
            } else {
                set_timers.push(id);
                setTimeout(() => {
                    executetimer(id);
                }, (tobj.time - Date.now() >= 2147483647 ? 2147483647 : tobj.time - Date.now()));
            }

        }
    };

    function executetimer(id){
        if(!Object.keys(files.timers.ids).includes(id)) return reject();
        let tobj = files.timers.ids[id];
        getuser(1, tobj.channel.id)
        .then(ch => {
            getuser(1, tobj.user.id)
            .then(u => {
                try {
                    j.send(0, ch[0], `[TIMER] ${u[0]}, Timer from ${_cleantime(Date.now()-parseInt(tobj.set_time), 5, 2).time.join(", ")} ago: ${tobj.message}`);

                    delete files.timers.ids[id];
                    files.timers.users[tobj.user.id].splice(files.timers.users[tobj.user.id].indexOf(tobj.id), 1);

                    // _wf(paths.timers, files.timers);
                } catch(e) {
                    throw e;
                }
            })
            .catch(e => {
                throw e;
            })
        })
        .catch(e => {
            throw e;
        })
    };
};

module.exports = executetimers;