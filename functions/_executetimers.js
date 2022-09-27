const paths = require("../variables/paths");
const getuser = require("./getuser");
const _cleantime = require("./_cleantime");
const _log = require("./_log");
const _syncfile = require("./_syncfile");
const _wf = require("./_wf");
let set_timers = [];

/**
 * 
 * @param {string} tid 
 * @returns 
 */

function _executetimers(tid){
    let tfile = _syncfile(5, paths.timers);
    let j = require("../variables/j");

    if(tid){
        if(!set_timers.includes(tid)){
            settimer(tid);
        } 
    } else {
        for(i = 0; i < Object.keys(tfile.times).length; i++){
            tfile.times[Object.keys(tfile.times)[i]].forEach(i2 => {
                settimer(i2);
            })
        }
        _log(1, `Set ${set_timers.length} timers`);
    }

    function settimer(id){
        if(Object.keys(tfile.ids).includes(id)){
            let tobj = tfile.ids[id];
            if(tobj.time - Date.now() < 1000){
                executetimer(tobj.id);
            } else {
                set_timers.push(id);
            }
            setTimeout(() => {
                executetimer(tobj.id);
            }, (tobj.time >= 2147483647 ? 2147483647 : tobj.time));

        }
    };

    function executetimer(id){
        if(!Object.keys(tfile.ids).includes(id)) return reject();
        let tobj = tfile.ids[id];
        getuser(1, tobj.channel.id)
        .then(ch => {
            getuser(1, tobj.user.id)
            .then(u => {
                try {
                    j.send(0, ch[0], `${u[0]}, Timer from ${_cleantime(Date.now()-parseInt(tobj.set_time), 5, 2).time.join(", ")} ago: ${tobj.message}`);

                    delete tfile.ids[id];
                    if(tfile.times[tobj.time].length === 1){
                        delete tfile.times[tobj.time];
                    } else {
                        tfile.times[tobj.time].splice(tfile.times[tobj.time].indexOf(tobj.id), 1);
                    }
                    tfile.users[tobj.user.id].splice(tfile.users[tobj.user.id].indexOf(tobj.id), 1);

                    _wf(paths.timers, tfile);
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

module.exports = _executetimers;