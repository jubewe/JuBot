const paths = require("../variables/paths");
const _appf = require("./_appf");
const _id = require("./_id");
const _rf = require("./_rf");
const _stackname = require("./_stackname");
const _wf = require("./_wf");

async function customcounter(opt, j, noreturn, channelid, counterid, countername, counternum){
    return new Promise((resolve, reject) => {
        j = j || require("../variables/j");
        channelid = channelid || j.message.channel.id;
        counternum = (!global.variables.varstatic.nonarr.includes(counternum) ? parseInt(counternum) : undefined);

        let channels = _rf(paths.channels, true);

        switch (opt) {
            case 0: {
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(Object.keys(channels.channels).includes(channelid)){
                    if(Object.keys(channels.channels[channelid]).includes("counters")){
                        if(countername || counterid){
                            counterid = counterid || getcounteridbyname();
                            
                            if(Object.keys(channels.channels[channelid]["counters"]).includes(counterid)){
                                return resolve(channels.channels[channelid]["counters"][counterid]);
                            } else {
                                return reject({path:[opt,1,1,1,0],msg:"channel counters do not include counter"});
                            }
                        } else {
                            return resolve(channels.channels[channelid]["counters"]);
                        }
                    } else {
                        if(countername || counterid){
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,1,0],msg:"counter not found - channel has no counters"});
                        } else {
                            if(noreturn) return resolve({});
                            return reject({path:[opt,1,0],msg:"channel has no counters"})
                        }
                    }
                } else {
                    return reject({path:[opt,0],msg:"channel not found"});
                }
                break;
            }

            case 1: {
                // 1: add

                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                // if(!countername && !counterid) return reject({path:[opt,1,0],msg:"countername is undefined"});
                // if(!counternum) return reject({path:[opt,1,1,0],msg:"counternum is undefined"});

                if(!Object.keys(channels.channels).includes(channelid)){
                    channels.channels[channelid] = {};
                }

                if(!Object.keys(channels.channels[channelid]).includes("counters")){
                    channels.channels[channelid]["counters"] = {};
                }

                createcounter();
                break;
            }

            case 2: {
                // delete
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!countername && !counterid) return reject({path:[opt,1,0],msg:"countername is undefined"});

                counterid = counterid || getcounteridbyname();

                if(Object.keys(channels.channels[channelid]["counters"]).includes(counterid)){
                    let counter = channels.channels[channelid]["counters"][counterid];
                    delete counter;

                    _wf(paths.channels, channels);
                    _appf(paths.counterlog, `\n${Date.now()} ${_stackname(0, "counters", "delete")[0]} ${channelid} ${counter.id} ${counter.name} ${JSON.stringify(counter)}`);

                    return resolve(counter);
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"counter not found"});
                }

                break;
            }

            case 3: {
                // rename

                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!countername && !counterid) return reject({path:[opt,1,0],msg:"countername is undefined"});
                if(global.variables.varstatic.nonarr.includes(counternum)) return reject({path:[opt,1,1,0],msg:"counternum - new name is undefined"})

                counterid = counterid || getcounteridbyname();

                if(Object.keys(channels.channels[channelid]["counters"]).includes(counterid)){
                    let counter = channels.channels[channelid]["counters"][counterid];
                    let counter_ = counter;
                    
                    counter.name = counternum;

                    _wf(paths.channels, channels);

                    _appf(paths.counterlog, `\n${Date.now()} ${_stackname(0, "counters", "rename")[0]} ${channelid} ${counter.id} ${counter.name} ${counter_.name} ${counter.name} ${JSON.stringify(counter)} ${JSON.stringify(counter_)}`);
                    return resolve(counter);
                } else {
                    if(noreturn) return resolve({});
                    return reject({path:[opt,0],msg:"counter not found"});
                }

                break;
            }

            case 4: 
            case 5: {
                // set
                // increment
                if(!channelid) return reject({path:[opt,0],msg:"channelid is undefined"});
                if(!countername && !counterid) return reject({path:[opt,1,0],msg:"countername is undefined"});
                if(global.variables.varstatic.nonarr.includes(counternum) && opt !== 5) return reject({path:[opt,1,1,0],msg:"counternum is undefined"});

                counterid = counterid || getcounteridbyname();

                if(!counterid){
                    createcounter()
                    .then(() => {
                        updatecounter();
                    })
                } else {
                    updatecounter();
                }

                break;
            }
        }

        async function createcounter(){
            _id(1, "channel", channelid, "counters")
            .then(id => {
                let counter = {
                    name: countername || `counter${id[1]}`,
                    id: id[0],
                    num: counternum || 0,
                };

                counterid = id[0];

                channels.channels[channelid]["counters"][id[0]] = counter;

                _wf(paths.channels, channels);
                _appf(paths.counterlog, `\n${Date.now()} ${_stackname(0, "counters", "add")[0]} ${channelid} ${counter.id} ${counter.name} ${JSON.stringify(counter)}`);

                return resolve(counter);
            })
            .catch(e => {
                console.error(e);
                return reject({path:[opt,0],msg:"could not create id"});
            })
        };

        async function updatecounter(){
            if(Object.keys(channels.channels[channelid]["counters"]).includes(counterid)){
                let counter = channels.channels[channelid]["counters"][counterid];
                let counter_ = counter;
                if(opt === 4){
                    counter.num = counternum || 0;
                } else if(opt === 5){
                    counter.num += counternum || 1;
                }

                _wf(paths.channels, channels);

                _appf(paths.counterlog, `\n${Date.now()} ${_stackname(0, "counters", "update")[0]} ${channelid} ${counter.id} ${counter.name} ${counter_.num} ${counter.num} ${JSON.stringify(counter)} ${JSON.stringify(counter_)}`);
                return resolve(counter);
            } else {
                if(noreturn) return resolve({});
                return reject({path:[opt,0],msg:"counter not found"});
            }
        };

        function getcounteridbyname(name){
            name = name || countername;
            let ret = undefined;
            if(!Object.keys(channels.channels).includes(channelid)){
                channels.channels[channelid] = {};
            }

            if(!Object.keys(channels.channels[channelid]).includes("counters")){
                channels.channels[channelid]["counters"] = {};
            }
            Object.keys(channels.channels[channelid]["counters"]).map(cntid => {
                if(channels.channels[channelid]["counters"][cntid].name === name){
                    ret = cntid;
                }
            });
            return ret;
        };
    });
};

module.exports = customcounter;