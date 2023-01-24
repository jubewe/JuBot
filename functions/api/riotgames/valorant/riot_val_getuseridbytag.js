const j = require("../../../../variables/j");
const _wf = require("../../../_wf");
const riot_api_requestheaders = require("../riot_api_requestheaders");

async function riot_val_getuserbyidtag(gameName, tagLine){
    return new Promise((resolve, reject) => {
        if(!gameName) return reject({path:[0],msg:"gameName is undefined"});
        if(!tagLine) return reject({path:[1,0],msg:"tagLine is undefined"});

        let name = encodeURI(`${gameName}#${tagLine}`.toLowerCase());

        if(j.files().riotgames_userids.names && j.files().riotgames_userids.names[name]){
            return resolve([name, j.files().riotgames_userids.names[name]]);
        }

        j.modules.request(`${j.urls().riotgames._base.europe}${j.urls().riotgames.account_v1.url_(gameName, tagLine)}`, riot_api_requestheaders(), (e, r) => {
            if(e){
                return reject(e);
            } else {
                console.log(r.body);
                let dat = JSON.parse(r.body);
                if(dat.puuid){
                    j.files().riotgames_userids.names[encodeURI(`${dat.gameName}#${dat.tagLine}`.toLowerCase())] = dat.puuid;
                    j.files().riotgames_userids.ids[dat.puuid] = encodeURI(`${dat.gameName}#${dat.tagLine}`.toLowerCase());
                    
                    // _wf(j.paths().riotgames_userids, j.files().riotgames_userids);
                    
                    return resolve([name, dat.puuid]);
                }

                return reject(r.body);
            }
        })
    });
};

riot_val_getuserbyidtag("Jubewe", "1234")
.then(tag => {
    console.log(tag);
})

module.exports = riot_val_getuserbyidtag;