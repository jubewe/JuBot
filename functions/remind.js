const paths = require("../variables/paths");
const _id = require("./_id");
const _wf = require("./_wf");

async function remind(opt, j_, noreturn, sender_userid, target_userid, reminder_id, message){
    return new Promise((resolve, reject) => {
        let j = require("../variables/j");
        sender_userid = (!global.variables.varstatic.nonarr.includes(sender_userid) ? sender_userid : j_.message.userstate.id);
        let reminders = j.files().reminders;
        let search_userid = (!global.variables.varstatic.nonarr.includes(target_userid) ? target_userid : sender_userid) || undefined;
        if(!Object.keys(reminders).includes("users")) reminders["users"] = {};
        if(!Object.keys(reminders).includes("ids")) reminders["ids"] = {};
        switch (opt) {
            case 0: {
                if(!reminder_id){
                    if(!sender_userid && !target_userid){
                        return resolve(reminders);
                    } else {
                        if(Object.keys(reminders.users).includes(search_userid)){
                            return resolve(getreminders(reminders.users[search_userid]));
                        } else {
                            if(noreturn) return resolve([[],[]]);
                            return reject({path:[opt,1,0],msg:"user not found"});
                        }
                    }
                } else {
                    let reminders_ = [];
                    if(!Array.isArray(reminder_id)) reminder_id = [reminder_id];

                    for(let reminder_id2 in reminder_id){
                        if(Object.keys(reminders.ids).includes(reminder_id2)){
                            reminders_.push(reminders.ids[reminder_id2]);
                        } 
                    }

                    return resolve(reminders_);
                }
                break;
            }

            case 1: {
                if(!target_userid) return reject({path:[opt,0],msg:"sender_userid is undefined"});

                if(!Object.keys(reminders.users).includes(target_userid)){
                    reminders.users[target_userid] = [];
                }

                _id(1, "users", target_userid, "reminders")
                .then(id => {
                    let reminder_ = {
                        "id": id[0],
                        "target_userid": target_userid,
                        "sender_userid": sender_userid,
                        "message": message,
                        "time": Date.now()
                    };
                    reminders.ids[id[0]] = reminder_;
                    reminders.users[target_userid].push(id[0]);
                    _wf(paths.reminders, reminders);

                    return resolve(reminder_);
                })
                .catch(e => {
                    return reject({path:[opt,1,0],msg:"could not create id",e:e});
                })
                break;
            }

            case 2: {
                if(!reminder_id) return reject({path:[opt,0],msg:"reminder_id is undefined"});

                let reminders_ = [];
                if(!Array.isArray(reminder_id)) reminder_id = [reminder_id];

                for(let reminder_id2 in reminder_id){
                    if(Object.keys(reminders.ids).includes(reminder_id2)){
                        reminders_.push(reminder_id2);
                        delete reminders.ids[reminder_id2];
                        if(Object.keys(reminders.users).includes(reminders.ids[reminder_id2].target_userid)){
                            reminders.users[reminders.ids[reminder_id2].target_userid].splice(reminders.ids[reminder_id2].target_userid.indexOf(reminder_id2),1);
                        }
                    }
                }

                _wf(paths.reminders, reminders);

                return resolve(reminders_);
                break;
            }

            case 3: {
                let reminders_ = [];
                if(!Object.keys(reminders.users).includes(search_userid)) return resolve([]);
                reminders.users[search_userid].forEach(reminder_ => {
                    reminders_.push(reminders.ids[reminder_]);
                });
                reminders.users[search_userid] = [];
                _wf(paths.reminders, reminders);

                return resolve(reminders_);
            }
        }

        function getreminders(ids){
            let ret = [];
            for(let ids2 in ids){
                if(Object.keys(reminders.ids).includes(ids[ids2])){
                    ret.push(reminders.ids[ids[ids2]]);
                }
            }
            return ret;
        };
    });
};

module.exports = remind;