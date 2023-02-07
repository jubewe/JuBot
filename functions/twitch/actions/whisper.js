const request = require("request");
const urls = require("../../../variables/urls");
const { e } = require("../../../variables/varstatic");
const _regex = require("../../_regex");
const _requestopts = require("../../_requestopts");
const getuser = require("../getuser");

/**
 * @param {number} from_user_id 
 * @param {number} to_user_id 
 * @param {string} message 
 * @param {string} customtoken 
 * @param {string} customclientid 
 */

async function whisper(from_user_id, to_user_id, message, customtoken, customclientid){
    return new Promise(async (resolve, reject) => {
        if(!(from_user_id ?? undefined) && customtoken) return reject({path:[0],msg:"from_user_id is undefined"});
        if(!(from_user_id ?? undefined) && !customtoken) from_user_id = e().T_USERID;
        if(!(to_user_id ?? undefined)) return reject({path:[0],msg:"to_user_id is undefined"});
        if(isNaN(to_user_id)){
            to_user_id = await getuser(1, to_user_id)[1];
        }
        if(!customtoken || !customclientid) customtoken = undefined; customclientid = undefined; from_user_id = e().T_USERID;

        let reqopts = {
            ..._requestopts("POST", customtoken, customclientid),
            body: JSON.stringify({"message": message})
        };
        reqopts.headers["Content-Type"] = "application/json";

        request(`${urls.twitch.whisper}?from_user_id=${from_user_id}&to_user_id=${to_user_id}`, reqopts, (e, r) => {
            if(e){
                return reject();
            } else {
                if(r.statusCode === 204){
                    return resolve();
                } else {
                    return reject(r.body);
                }
            }
        });
    });
};

module.exports = whisper;