let files = require("../../variables/files");
const _regex = require("../_regex");
const request = require("request");
const urls = require("../../variables/urls");

async function getuser(user) {
    return new Promise((resolve, reject) => {
        if(!user) return reject({path:[0],msg:"user is undefined"});
        if(_regex.numregex().test(user)){
            if(files.seventv.userids.twitch_ids[user]) return resolve([files.seventv.userids.twitch_ids[user].login, files.seventv.userids.twitch_ids[user].twitch_id, files.seventv.userids.twitch_ids[user].id])
        } else if(_regex.usernamereg().test(user)){
            if(files.seventv.userids.users[user]) return resolve([files.seventv.userids.users[user].login, files.seventv.userids.users[user].twitch_id, files.seventv.userids.users[user].id])
        }

        request(urls.seventv.v2.user.replace(":user", user), (e, r) => {
            if(e) return reject(e);
            if(r.statusCode !== 200) return reject(r.body);
            let dat = JSON.parse(r.body);
            let obj = {
                "login": dat.login,
                "twitch_id": dat.twitch_id,
                "id": dat.id
            };
            files.seventv.userids.users[dat.login] = obj;
            files.seventv.userids.twitch_ids[dat.twitch_id] = obj;
            files.seventv.userids.ids[dat.id] = obj;

            return resolve([obj.login, obj.twitch_id, obj.id]);
        })
    });
};

module.exports = getuser;