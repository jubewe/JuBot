const request = require("request");
const j = require("../../variables/j");
const paths = require("../../variables/paths");
const urls = require("../../variables/urls");
const getuser = require("../getuser");
const replacevariables = require("../replacevariables");
const replacevariableslive = require("../replacevariableslive");
const _combineArr = require("../_combineArr");
const _joinurlquery = require("../_joinurlquery");
const _log = require("../_log");
const _regex = require("../_regex");
const _requestopts = require("../_requestopts");
const _stackname = require("../_stackname");
const _wf = require("../_wf");

async function livechannels(){
    return new Promise((resolve, reject) => {
        _log(1, `${_stackname("trackers")[3]} Executed`);
        let channels = j.files().channels;

        let checknotificationlive = [];
        let checktrkactivemods = [];
        Object.keys(channels.channels).forEach(ch => {
            let ch_ = channels.channels[ch];
            if(ch_.trackers && ch_.trackers.activemods && [1].includes(ch_.trackers.activemods.state)){
                checktrkactivemods.push(ch);
            } 
            if(ch_.notifications && ch_.notifications.live && [1].includes(ch_.notifications.live.state)){
                checknotificationlive.push(ch);
            }
        });
        let checklivechannels = _combineArr(checknotificationlive, checktrkactivemods);

        for(let i = 0; i < Math.ceil(checklivechannels.length / 100); i++){
            request(urls.twitch.channels.get + _joinurlquery("broadcaster_id", checklivechannels.slice((100*i), ((100*i)+100))), _requestopts("GET"), (e, r) => {
                if(e){
                    throw e;
                } else {
                    _log(1, `${_stackname("trackers", "live")[3]} Executed`);
                    // channels = j.files().channels;
                    if(_regex.jsonreg().test(r.body)){
                        let dat = JSON.parse(r.body);
                        (async() => {
                            Object.keys(dat.data).forEach(async (ch) => {
                                let ch_ = dat.data[ch];
                                if(!channels.channels[ch_.broadcaster_id].trackers.data) channels.channels[ch_.broadcaster_id].trackers.data = {};
                                if(!channels.channels[ch_.broadcaster_id].trackers.data.live) channels.channels[ch_.broadcaster_id].trackers.data.live = {};
                                if(!channels.channels[ch_.broadcaster_id].trackers.data.live.last_live) channels.channels[ch_.broadcaster_id].trackers.data.live.last_live = -1;
                                
                                if(checknotificationlive.includes(ch_.broadcaster_id)){
                                    if(Date.now() - (channels.channels[ch_.broadcaster_id].trackers.data.live.last_live) > j.c().intervals.trackers.live - j.c().buffers.live_check && Date.now() - (channels.channels[ch_.broadcaster_id].trackers.data.live.last_live) > j.c().timeouts.trackers.live_check){
                                        if(!channels.channels[ch_.broadcaster_id].notifications.live.last_execution || Date.now()-channels.channels[ch_.broadcaster_id].notifications.live.last_execution > j.c().timeouts.trackers.live_check){
                                            channels.channels[ch_.broadcaster_id].notifications.live.last_execution = Date.now();
                                            // console.log(ch_);
                                            replacevariableslive(channels.channels[ch_.broadcaster_id].notifications.live.message || j.c().notifications.defaultmessages.live, ch_)
                                            .then(msg => {
                                                replacevariables(undefined, msg)
                                                .then(msg2 => {
                                                    j.send(0, ch_.broadcaster_login, msg2);
                                                })
                                                .catch(e => {
                                                    j.send(0, ch_.broadcaster_login, msg);
                                                })
                                            })
                                        }
                                    }
                                }
    
                                if(checktrkactivemods.includes(ch_.broadcaster_id)){
                                    if(!channels.channels[ch_.broadcaster_id].trackers.data.activemods) channels.channels[ch_.broadcaster_id].trackers.data.activemods = {};
                                    if(!channels.channels[ch_.broadcaster_id].trackers.data.activemods.users) channels.channels[ch_.broadcaster_id].trackers.data.activemods.users = {};
                                    
                                    request(j.urls().twitch.chatters.replace("${channel}", ch_.broadcaster_login), _requestopts(), async (e2, r2) => {
                                        if(e2){
                                            throw e2;
                                        } else {
                                            let dat2 = JSON.parse(r2.body);
                                            for(let activemod in dat2.chatters.moderators){
                                                let activemod_ = await getuser(1, dat2.chatters.moderators[activemod]);
                                                if(!channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]]) channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]] = {};
                                                if(channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]].last_active && (Date.now()-channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]].last_active) >= j.c().intervals.trackers.activemods - j.c().buffers.active_mods){
                                                    channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]].active_time = (channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]].active_time || 0) + j.c().intervals.trackers.live;
                                                }
                                                channels.channels[ch_.broadcaster_id].trackers.data.activemods.users[activemod_[1]].last_active = Date.now();
                                                _wf(paths.channels, channels);
                                            }
                                        }
                                    })
                                }
    
                                channels.channels[ch_.broadcaster_id].trackers.data.live.last_live = Date.now();
                                channels.channels[ch_.broadcaster_id].trackers.data.live.last = ch_;
    
                            });

                            _wf(paths.channels, channels);
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
  broadcaster_id: '263830208',
  broadcaster_login: 'jubewe',
  broadcaster_name: 'Jubewe',
  broadcaster_language: 'de',
  game_id: '1469308723',
  game_name: 'Software and Game Development',        
  title: 'doing stuff | phil troll Kappa | original',
  delay: 0
}
 */

module.exports = livechannels;