let j = require("../variables/j");
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
        let userids = j.files().userids;
        function appendids(ainum){
            _wf(paths.userids, userids);
            return resolve(ainum);
        };

        if(!regex.numregex().test(guinput)){
            // name
            guinput = guinput.toLowerCase().replace(replacer, "");
            if(Object.keys(userids.names).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([guinput,userids.names[guinput]]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0]);
                } else if(gumode === 1){
                    getuserid(guinput)
                    .then(id => {
                        if(userids.errors.includes(id.toString())){
                            userids.errors.splice(userids.errors.indexOf(id.toString()), 1);
                            _wf(paths.userids, userids);
                            logcode(`@type=founduser;@data=msg:found+user,user:${id.toString()}`);
                        }
                        id = id.toString();
                        userids.names[guinput] = id;
                        userids.ids[id] = guinput;
                        appendids([guinput,id]);
                    })
                    .catch(e => {
                        if(!userids.errors.includes(guinput)){
                            userids.errors.push(guinput);
                            _wf(paths.userids, userids);
                        }
                        return reject([gumode,1,0]);
                    })
                }
            }
        } else if(regex.numregex().test(guinput)) {
            // id
            guinput = guinput.toString();
            if(Object.keys(userids.ids).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([userids.ids[guinput], guinput]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0])
                } else if(gumode === 1){
                    getuserbyid(guinput)
                    .then(name => {
                        if(userids.errors.includes(name)){
                            userids.errors.splice(userids.errors.indexOf(name), 1);
                            _wf(paths.userids, userids);
                            logcode(`@type=founduser;@data=msg:found+user,user:${name}`);
                        }
                        userids.names[name] = guinput;
                        userids.ids[guinput] = name;
                        appendids([name,guinput]);
                    })
                    .catch(err => {
                        if(!userids.errors.includes(guinput)){
                            userids.errors.push(guinput);
                            _wf(paths.userids, userids);
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