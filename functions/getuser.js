const files = require("../variables/files");
const paths = require("../variables/paths");
let { replacer } = require("../variables/varstatic");
const getuserbyid = require("./getuserbyid");
const getuserid = require("./getuserid");
const logcode = require("./_logcode");
let regex = require("./_regex");
const _wf = require("./_wf");

async function getuser(gumode, guinput){
    // [name, id]
    return new Promise(function(resolve, reject){
        let userids = files.userids;
        function appendids(ainum){
            _wf(paths.userids, files.userids);
            return resolve(ainum);
        };

        if(!regex.numregex().test(guinput)){
            // name
            guinput = guinput.toLowerCase().replace(replacer, "");
            if(Object.keys(files.userids.names).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([guinput,files.userids.names[guinput]]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0]);
                } else if(gumode === 1){
                    getuserid(guinput)
                    .then(id => {
                        if(files.userids.errors.includes(id.toString())){
                            files.userids.errors.splice(files.userids.errors.indexOf(id.toString()), 1);
                            _wf(paths.userids, files.userids);
                            logcode(`@type=founduser;@data=msg:found+user,user:${id.toString()}`);
                        }
                        id = id.toString();
                        files.userids.names[guinput] = id;
                        files.userids.ids[id] = guinput;
                        appendids([guinput,id]);
                    })
                    .catch(e => {
                        if(!files.userids.errors.includes(guinput)){
                            files.userids.errors.push(guinput);
                            _wf(paths.userids, files.userids);
                        }
                        return reject([gumode,1,0]);
                    })
                }
            }
        } else if(regex.numregex().test(guinput)) {
            // id
            guinput = guinput.toString();
            if(Object.keys(files.userids.ids).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([files.userids.ids[guinput], guinput]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0])
                } else if(gumode === 1){
                    getuserbyid(guinput)
                    .then(name => {
                        if(files.userids.errors.includes(name)){
                            files.userids.errors.splice(files.userids.errors.indexOf(name), 1);
                            _wf(paths.userids, files.userids);
                            logcode(`@type=founduser;@data=msg:found+user,user:${name}`);
                        }
                        files.userids.names[name] = guinput;
                        files.userids.ids[guinput] = name;
                        appendids([name,guinput]);
                    })
                    .catch(err => {
                        if(!files.userids.errors.includes(guinput)){
                            files.userids.errors.push(guinput);
                            _wf(paths.userids, files.userids);
                        }
                        return reject([gumode,1,0]);
                    })
                }
            }
        } else {
            return reject([gumode,1,0])
        }
    })
};

module.exports = getuser;