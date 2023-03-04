let files = require("../../variables/files");
const _id = require("./_id");

async function remind(opt, j_, noreturn, sender_userid, target_userid, reminder_id, message) {
    return new Promise((resolve, reject) => {
        sender_userid = (!(sender_userid ?? undefined) ? sender_userid : j_.message.userstate.id);
        let search_userid = (!(target_userid ?? undefined) ? target_userid : sender_userid) || undefined;
        if (!files.reminders.users) files.reminders["users"] = {};
        if (!files.reminders.ids) files.reminders["ids"] = {};
        switch (opt) {
            case 0: {
                if (!reminder_id) {
                    if (!sender_userid && !target_userid) {
                        return resolve(files.reminders);
                    } else {
                        if (files.reminders.users[search_userid]) {
                            return resolve(getreminders(files.reminders.users[search_userid]));
                        } else {
                            if (noreturn) return resolve([[], []]);
                            return reject({ path: [opt, 1, 0], msg: "user not found" });
                        }
                    }
                } else {
                    let reminders_ = [];
                    if (!Array.isArray(reminder_id)) reminder_id = [reminder_id];

                    for (let reminder_id2 in reminder_id) {
                        if (files.reminders.ids[reminder_id2]) {
                            reminders_.push(files.reminders.ids[reminder_id2]);
                        }
                    }

                    return resolve(reminders_);
                }
                break;
            }

            case 1: {
                if (!target_userid) return reject({ path: [opt, 0], msg: "sender_userid is undefined" });

                if (!files.reminders.users[target_userid]) {
                    files.reminders.users[target_userid] = [];
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
                        files.reminders.ids[id[0]] = reminder_;
                        files.reminders.users[target_userid].push(id[0]);
                        // _wf(paths.reminders, files.reminders);

                        return resolve(reminder_);
                    })
                    .catch(e => {
                        return reject({ path: [opt, 1, 0], msg: "could not create id", e: e });
                    })
                break;
            };

            case 2: {
                if (!reminder_id) return reject({ path: [opt, 0], msg: "reminder_id is undefined" });

                let reminders_ = [];
                if (!Array.isArray(reminder_id)) reminder_id = [reminder_id];

                for (let reminder_id2 in reminder_id) {
                    if (files.reminders.ids[reminder_id2]) {
                        reminders_.push(reminder_id2);
                        if (files.reminders.users[files.reminders.ids[reminder_id2].target_userid]) {
                            files.reminders.users[files.reminders.ids[reminder_id2].target_userid].splice(files.reminders.ids[reminder_id2].target_userid.indexOf(reminder_id2), 1);
                        }
                        delete files.reminders.ids[reminder_id2];
                    }
                }

                // _wf(paths.reminders, files.reminders);

                return resolve(reminders_);
                break;
            };

            case 3: {
                if (!(reminder_id ?? undefined)) return reject({ path: [opt, 0], msg: "reminder_id is undefined" });
                if (!(message ?? undefined)) return reject({ path: [opt, 1, 0], msg: "message is undefined" });
                if (!files.reminders.ids[reminder_id]) return reject({ path: [opt, 1, 1, 0], msg: "reminder not found by id" });

                let reminder = files.reminders.ids[reminder_id];
                if (reminder.sender_userid !== sender_userid) return reject({ path: [opt, 1, 1, 1, 0], msg: "timer does not belong to inputted user" });

                files.reminders.ids[reminder_id].message = message;

                return resolve(files.reminders.ids[reminder_id]);

                break;
            };

            case 4: {
                let reminders_ = [];
                if (!Object.keys(files.reminders.users).includes(search_userid)) return resolve([]);
                files.reminders.users[search_userid].forEach(reminder_ => {
                    reminders_.push(files.reminders.ids[reminder_]);
                });
                files.reminders.users[search_userid] = [];

                // if (reminders_.length > 0) {
                //     _wf(paths.reminders, files.reminders);
                // }

                return resolve(reminders_);
                break;
            };
        };

        function getreminders(ids) {
            let ret = [];
            for (let ids2 in ids) {
                if (Object.keys(files.reminders.ids).includes(ids[ids2])) {
                    ret.push(files.reminders.ids[ids[ids2]]);
                }
            }
            return ret;
        };
    });
};

module.exports = remind;