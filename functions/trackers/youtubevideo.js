const request = require("request");
let j = require("../../variables/j");
const urls = require("../../variables/urls");
const _joinurlquery = require("../_joinurlquery");

async function youtubevideo(){
    return new Promise((resolve, reject) => {
        let channels = j.files().channels;
        
        let checknotificationyoutube = [];

        Object.keys(channels.channels).filter(ch => {
            return (channels.channels[ch].notifications && channels.channels[ch].notifications.youtube_video && channels.channels[ch].youtube_channelid);
        });

        for(let i = 0; i < Math.ceil(checknotificationyoutube.length/100); i++){
            request(`${urls().youtube.videos.get_raw}${_joinurlquery("channelid", checknotificationyoutube.map(cny => {return channels.channels[cny].youtube_channelid}), true)}&type=video&key=${j.e().YT_APIKEY}`, {method: "GET"}, (e, r) => {
                if(e){
                    console.error(e);
                } else {
                    console.log(r.body);
                }
            })
        }
    });
};

module.exports = youtubevideo;