const fs = require("fs");
let { userids: useridspath } = require("../variables/paths");
let { replacer } = require("../variables/varstatic");
let getuserid = require("./getuserid");
const logcode = require("./_logcode");
let regex = require("./_regex");
const syncfile = require("./_syncfile");

async function getuser(gumode, guinput){
    // [name, id]
    return new Promise(function(resolve, reject){
        let useridsfile = syncfile(5, useridspath)
        function appendids(ainum){
            fs.writeFileSync(useridspath, JSON.stringify(useridsfile));
            return resolve(ainum);
        };

        if(!regex.numregex(guinput)){
            // name
            guinput = guinput.toLowerCase().replace(replacer, "");
            if(Object.keys(useridsfile.names).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([guinput,useridsfile.names[guinput]]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0]);
                } else if(gumode === 1){
                    getuserid(guinput)
                    .then(id => {
                        if(useridsfile.errors.includes(id.toString())){
                            useridsfile.errors.splice(useridsfile.errors.indexOf(id.toString()), 1);
                            fs.writeFileSync(useridspath, JSON.stringify(useridsfile));
                            logcode(`@type=founduser;@data=msg:found+user,user:${id.toString()}`);
                        }
                        id = id.toString();
                        useridsfile.names[guinput] = id;
                        useridsfile.ids[id] = guinput;
                        appendids([guinput,id]);
                    })
                    .catch(e => {
                        if(!useridsfile.errors.includes(guinput)){
                            useridsfile.errors.push(guinput);
                            fs.writeFileSync(useridspath, JSON.stringify(useridsfile));
                        }
                        console.error(e);
                        return reject([gumode,1,0]);
                    })
                }
            }
        } else if(regex.numregex(guinput)) {
            // id
            guinput = guinput.toString();
            if(Object.keys(useridsfile.ids).includes(guinput)){
                if(gumode === 0){
                    return resolve([gumode,1,1]);
                } else if(gumode === 1){
                    return resolve([useridsfile.ids[guinput], guinput]);
                }
            } else {
                if(gumode === 0){
                    return reject([gumode,0])
                } else if(gumode === 1){
                    getuserbyid(guinput)
                    .then(name => {
                        if(useridsfile.errors.includes(name)){
                            useridsfile.errors.splice(useridsfile.errors.indexOf(name), 1);
                            fs.writeFileSync(useridspath, JSON.stringify(useridsfile));
                            logcode(`@type=founduser;@data=msg:found+user,user:${name}`);
                        }
                        useridsfile.names[name] = guinput;
                        useridsfile.ids[guinput] = name;
                        appendids([name,guinput]);
                    })
                    .catch(err => {
                        if(!useridsfile.errors.includes(guinput)){
                            useridsfile.errors.push(guinput);
                            fs.writeFileSync(useridspath, JSON.stringify(useridsfile));
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