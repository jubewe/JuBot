let files = require("../../variables/files");
let { replacer } = require("../../variables/varstatic");
const getuserbyid = require("./getuserbyid");
const getuserid = require("./getuserid");
let regex = require("../_regex");

async function getuser(gumode, guinput){
    // [name, id]
    return new Promise(function(resolve, reject){
        function appendids(ainum){
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
                        }
                        id = id.toString();
                        files.userids.names[guinput] = id;
                        files.userids.ids[id] = guinput;
                        appendids([guinput,id]);
                    })
                    .catch(e => {
                        if(!files.userids.errors.includes(guinput)){
                            files.userids.errors.push(guinput);
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
                        }
                        files.userids.names[name] = guinput;
                        files.userids.ids[guinput] = name;
                        appendids([name,guinput]);
                    })
                    .catch(err => {
                        if(!files.userids.errors.includes(guinput)){
                            files.userids.errors.push(guinput);
                        }
                        return reject([gumode,1,0]);
                    })
                }
            }
        } else {
            return reject([gumode,1,0])
        }
    });
};

module.exports = getuser;