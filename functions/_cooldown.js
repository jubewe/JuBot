/**
 * 
 * @param {number} copt 
 * @param {number} cchan
 * @param {string} cid 
 * @param {number} cuser 
 * @param {boolean} creject
 * @returns {object | array}
 */

const files = require("../variables/files");
const paths = require("../variables/paths");
const _wf = require("./_wf");

async function _cooldown(copt, cchan, cid, cuser, creject){
    return new Promise(function(resolve, reject){
        let cname = "channels";

        let cglobal = ["global"];
        if(!files.cooldowns[cname]) files.cooldowns[cname] = {};
        let cpath = files.cooldowns[cname];

        switch (copt){
            case 0: {
                if(!cname) return reject({"path":[copt,0],"msg":"cname is undefined"});
                if(!cchan) return reject({"path":[copt,1,0],"msg":"cchan is undefined"})
                if(!cid) return reject({"path":[copt,1,1,0],"msg":"cid is undefined"});

                if(Object.keys(files.cooldowns[cname]).includes(cchan)){
                    cpath = files.cooldowns[cname][cchan];
                    if(cid && Object.keys(cpath).includes(cid)){
                        if(cuser && Object.keys(cpath[cid]["users"]).includes(cuser)){
                            return resolve([cpath[cid]["all"], cpath[cid]["users"][cuser]]);
                        } else {
                            return resolve([cpath[cid]["all"], 0]);
                        }
                    } else {
                        if(creject) return reject({"path":[copt,1,1,1,0],"msg":"cid not in cpath"});
                        return resolve([0, 0]);
                    }

                } else {
                    if(creject) return reject({"path":[copt,1,1,0],"msg":"cpath is undefined"});
                    return resolve([0, 0]);
                }

                break;
            }

            case 1: {
                if(!cid) return reject({"path":[copt,0],"msg":"cid is undefined"});
                if(!cuser) return reject({"path":[copt,1,0],"msg":"cuser is undefined"});

                if(!files.cooldowns[cname][cchan]) files.cooldowns[cname][cchan] = {}; 

                cpath = files.cooldowns[cname][cchan];
                
                if(!Object.keys(cpath).includes(cid)){
                    cpath[cid] = {};
                    cpath[cid]["users"] = {};
                } 
                cpath = cpath[cid];

                cpath["all"] = Date.now();
                cpath["users"][cuser] = Date.now();

                _wf(paths.cooldowns, files.cooldowns);

                return resolve([cpath["all"], cpath["users"][cuser]]);

                break;
            }
        }
    });
};

module.exports = _cooldown;