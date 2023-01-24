const request = require("request");
const urls = require("../../variables/urls");
const getuser = require("../twitch/getuser");
const replacevariables = require("../discord/replacevariables");
const replacevariableslive = require("../twitch/replacevariableslive");
const _combineArr = require("../_combineArr");
const _joinurlquery = require("../_joinurlquery");
const _log = require("../_log");
const _regex = require("../_regex");
const _removeduplicates = require("../_removeduplictes");
const _requestopts = require("../_requestopts");
const _stackname = require("../_stackname");
const _checkmultiplevaliinobj = require("../_checkmultiplevalinobj");

async function livechannels(){
    return new Promise((resolve, reject) => {
        let j = require("../../variables/j");
        _log(1, `${_stackname("trackers")[3]} Executed`);
        let channels = j.files().channels;

        let checknotificationlive = [];
        let checktrkactivemods = [];
        Object.keys(channels.channels).forEach(ch => {
            let ch_ = channels.channels[ch];
            if(ch_.trackers && ch_.trackers.activemods && [1].includes(ch_.trackers.activemods.state)){
                checktrkactivemods.push(ch);
                // if(!checknotificationlive.includes(ch)){
                // };
            } 
            if(ch_.notifications && ch_.notifications.live && [1].includes(ch_.notifications.live.state)){
                checknotificationlive.push(ch);
                // if(!checktrkactivemods.includes(ch)){
                // };
            }
        });
        let checklivechannels = _removeduplicates(_combineArr(checknotificationlive, checktrkactivemods));

        for(let i = 0; i < Math.ceil(checklivechannels.length / 100); i++){
            request(urls.twitch.streams + _joinurlquery("user_id", checklivechannels.slice((100*i), ((100*i)+100)), true), _requestopts("GET"), (e, r) => {
                if(e){
                    throw e;
                } else {
                    _log(1, `${_stackname("trackers", "live")[3]} Executed`);

                    if(r.statusCode !== 200) return new Error(r.body);
                    // channels = j.files().channels;
                    if(_regex.jsonreg().test(r.body)){

                        let dat = JSON.parse(r.body);
                        (async() => {
                            Object.keys(dat.data).forEach(async (ch) => {
                                let ch_ = dat.data[ch];
                                if(!channels.channels[ch_.user_id].trackers) channels.channels[ch_.user_id].trackers = {};
                                if(!channels.channels[ch_.user_id].trackers.data) channels.channels[ch_.user_id].trackers.data = {};
                                if(!channels.channels[ch_.user_id].trackers.data.live) channels.channels[ch_.user_id].trackers.data.live = {};
                                if(!(channels.channels[ch_.user_id].trackers.data.live.last_live ?? undefined)) channels.channels[ch_.user_id].trackers.data.live.last_live = -1;
                                
                                if(checknotificationlive.includes(ch_.user_id)){
                                    if((channels.channels[ch_.user_id].trackers.data.live.last_live < 0) || ((Date.now() - (channels.channels[ch_.user_id].trackers.data.live.last_live)) > (j.c().intervals.trackers.live - j.c().buffers.live_check) && (Date.now() - (channels.channels[ch_.user_id].trackers.data.live.last_live)) > j.c().timeouts.trackers.live_check)){
                                        if((channels.channels[ch_.user_id].trackers.data.live.last_live < 0) || !channels.channels[ch_.user_id].notifications.live.last_execution || Date.now()-channels.channels[ch_.user_id].notifications.live.last_execution > j.c().timeouts.trackers.live_check){
                                            channels.channels[ch_.user_id].notifications.live.last_execution = Date.now();
                                            replacevariableslive(((!_checkmultiplevaliinobj(channels.channels[ch_.user_id], ["notifications", "live", "message"]) || !(channels.channels[ch_.user_id].notifications.live.message ?? undefined)) ? j.c().notifications.defaultmessages.live : channels.channels[ch_.user_id].notifications.live.message), ch_)
                                            .then(msg => {
                                                // j.send(0, ch_.user_login, msg);
                                                replacevariables(undefined, msg)
                                                .then(msg2 => {
                                                    j.send(0, ch_.user_login, msg2);
                                                })
                                                .catch(e => {
                                                    j.send(0, ch_.user_login, msg);
                                                })
                                            })
                                            .catch(e => {
                                                console.error(e);
                                            })
                                        }
                                    }
                                }
    
                                if(checktrkactivemods.includes(ch_.user_id)){
                                    if(!channels.channels[ch_.user_id].trackers.data.activemods) channels.channels[ch_.user_id].trackers.data.activemods = {};
                                    if(!channels.channels[ch_.user_id].trackers.data.activemods.users) channels.channels[ch_.user_id].trackers.data.activemods.users = {};

                                    request(j.urls().twitch.chatters.replace("${channel}", ch_.user_login), {method: "GET"}, async (e2, r2) => {
                                        if(e2){
                                            throw e2;
                                        } else {
                                            let dat2 = JSON.parse(r2.body);
                                            for(let activemod in dat2.chatters.moderators){
                                                let activemod_ = await getuser(1, dat2.chatters.moderators[activemod]);
                                                if(!channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]]) channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]] = {};
                                                if(channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]].last_active && (Date.now()-channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]].last_active) >= j.c().intervals.trackers.activemods - j.c().buffers.active_mods){
                                                    channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]].active_time = (channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]].active_time || 0) + j.c().intervals.trackers.live;
                                                }
                                                channels.channels[ch_.user_id].trackers.data.activemods.users[activemod_[1]].last_active = Date.now();
                                                // _wf(paths.channels, channels);
                                            }
                                        }
                                    })
                                }
    
                                channels.channels[ch_.user_id].trackers.data.live.last_live = Date.now();
                                channels.channels[ch_.user_id].trackers.data.live.live_time = (channels.channels[ch_.user_id].trackers.data.live.live_time || 0) + j.c().intervals.trackers.live;
                                channels.channels[ch_.user_id].trackers.data.live.last = ch_;
    
                            });

                            _log(1, `${_stackname("trackers", "live")[3]} Live Channels: ${Object.keys(dat.data).map(a => {return `${dat.data[a].user_id} ${dat.data[a].user_login}`})}`);

                            // _wf(paths.channels, channels);
                            return resolve(dat);
                        })();
                    } else {
                        return reject(r.body);
                    }
                }
            });
        }
    });
};

/*
{
  "id": "41375541868",
  "user_id": "459331509",
  "user_login": "auronplay",
  "user_name": "auronplay",
  "game_id": "494131",
  "game_name": "Little Nightmares",
  "type": "live",
  "title": "hablamos y le damos a Little Nightmares 1",
  "viewer_count": 78365,
  "started_at": "2021-03-10T15:04:21Z",
  "language": "es",
  "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_auronplay-{width}x{height}.jpg",
  "tag_ids": [
    "d4bb9c58-2141-4881-bcdc-3fe0505457d1"
  ],
  "is_mature": false
},
 */

module.exports = livechannels;