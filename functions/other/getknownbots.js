const varnames = require("../../variables/varnames");
const _cache = require("../_cache");
const _combineArr = require("../_combineArr");

async function getknownbots(){
    return new Promise((resolve, reject) => {
        let files = require("../../variables/files");
        let j = require("../../variables/j");
        j.modules.request(`${j.urls().twitchbots_info._base}${j.urls().twitchbots_info.bot}`, {method: "GET"}, (e, r) => {
            if(e) return reject(e);
            let dat = JSON.parse(r.body);
            let bots = _combineArr(files.twitch_knownbots.bots, dat.bots.map(a => {return a.id}));
            _cache(1, varnames.cache.twitch.knownbots, bots)
            .then(c => {
                return resolve(c);
            })
            .catch(e => {
                return reject(e);
            })
        });
    });
};

module.exports = getknownbots;