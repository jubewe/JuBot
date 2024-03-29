let replacevariables = require("../replacevariables");
const _log = require("../../_log");
const _staticspacer = require("../../_staticspacer");
const _splitmsg = require("../../_splitmsg");
const _pixelize = require("../../_pixelize");
const _regex = require("../../_regex");
const _splitafter = require("../../_splitafter");
const _regex_filter = require("../../_regex_filter");
let c = require("../../../config.json");

/**
 * @param {number} smode 
 * @param {string | null | undefined} schan 
 * @param {string} smsg 
 * @param {number | null | undefined} sparentid 
 * @param {boolean | null | undefined} sfirst 
 * @param {boolean | undefined} smulti 
 * @param {boolean | null | undefined} sreplacer
 */

async function send(smode, schan, smsg, sparentid, sfirst, smulti, sreplacer, sregfilter) {
  return new Promise(async (resolve, reject) => {
    let j = require("../../../variables/j");
    let j_;
    if(schan.message){
      j_ = schan;
      schan = null;
    };

    schan = !(schan ?? undefined) ? j_.message._.chan : schan;
    smulti = !(smulti ?? undefined) ? undefined : smulti;
    sregfilter = (smulti ?? undefined) === undefined ? false : true;

    if(smsg.startsWith("Error:")) smsg = "PoroSad " + smsg;
  
    if(smsg.startsWith("/")){
      let scmd = smsg.split(" ")[0].split("/")[1];
      if(_regex.t_actionreg().test(scmd)){
        smode = scmd;
      }
    };

    let sendtrys = 3;
    let sendretrytimeout = c.timeouts.sendretrytimeout;
  
    if(j_ && j_.message._.modified_send){smode = j_.message._.modified_send;};

    if(j_ && j_.message.messageCommand === "WHISPER"){smode = 1; schan = (schan && _regex.numregex().test(schan) ? schan : j_.message.userstate.id)};
    if(j_ && j_.message._.modified_channel){smode = 2; schan = j_.message._.modified_channel.name; smsg = `[in ${_pixelize(j_.message.channel.name)} (${j_.message.channel.id})] ${smsg}`;}
    if([3, "tag"].includes(smode)){smsg = j_.message._.usertag_ + smsg;}
    if(j_ && sreplacer){smsg = await replacevariables(j_, smsg);}

    let regstart = Date.now();
    if(sregfilter) smsg = await _regex_filter(1, smsg);
    let regafter = Date.now();
    // console.log("Regex parsing took", regafter - regstart, "ms");
  
    if(smsg.includes("\n")){
      let smsges = smsg.split("\n");
      for(i = 0; i < smsges.length; i++){
        let smsg_ = smsges[i];
        _send(smode, schan, smsg_, sparentid, (i === 0 ? true : false));
      }
    } else if(smsg.length > 500){
      let smsges = _splitmsg(smsg, ",", 500, 1, 1);
      if(smsges.length > 3 && !smulti){
        _send(smode, schan, `<Error: Too long message>`, sparentid, true); 
        return;
      }
      for(i = 0; i < smsges.length; i++){
        let smsg_ = smsges[i];
        _send(smode, schan, smsg_, sparentid, (i === 0 ? true : false));
      }
    } else {
      _send(smode, schan, smsg, sparentid, sfirst)
    };
    
    async function _send(_smode, _schan, _smsg, _sparentid, _sfirst){
      smsg = smsg.replace(new RegExp("\n", "g"), "\\n");
      smsg = smsg.replace(new RegExp("\r", "g"), "\\r");

      function _send(){
        if(sendtrys > 0){
          sendtrys--;
          j.client.send(_schan, (_sfirst === false ? "" : j.vars().botnamebeta()) + _smsg)
          .then(() => {return resolve(this)})
          .catch(e => {
            console.error(new Error(e));
            (async () => {
              setTimeout(() => {
                _send();
              }, sendretrytimeout);
            })();
          })
        } else {
          return;
        }
      };
      
      function _whisper(){
        if(sendtrys > 0){
          sendtrys--;
          j.client.whisper(_schan, j.vars().botnamebeta() + _smsg)
          .then(w => {_log(0, `${_staticspacer(1, "[W] ->")} ${_staticspacer(2, _schan)} ${_smsg}`); return resolve(w)})
          .catch((e) => {
            console.error(e);
            (async () => {
              setTimeout(() => {
                _whisper();
              }, sendretrytimeout);
            })();
          })
        } else {
          return;
        }
      };
      
      function _reply(){
        if(sendtrys > 0){
          sendtrys--;
          j_.message.reply(j.vars().botnamebeta() + _smsg)
          .then(() => {return resolve(this)})
          .catch((e) => {
            console.error(new Error(e));
            (async () => {
              setTimeout(() => {
                _send();
              }, sendretrytimeout);
            })();
          });
        } else {
          return;
        }
      };

      if ([null, undefined, 0, "channel", 3, "user"].includes(_smode)) {
        _send();
      } else if ([1, "whisper", "dm"].includes(_smode)) {
        _whisper();
      } else if ([2, "reply"].includes(_smode)) {
        _sparentid = (!(_sparentid ?? undefined) ? j_.message.message.id : _sparentid);
        _reply();
      } else if([10, "ban"].includes(_smode)) {
        if(!_smsg.split(" ")[1]) return reject({path:[0],msg:`username is undefined`});
        
        j.functions().twitch.ban(j_.message.channel.id, j_.message.userstate.id, _smsg.split(" ")[1], _splitafter(j_.message._.msg, 2))
        .then(b => {
          return resolve(b);
        })
        .catch(e => {
          return reject(e);
        })
      }
    }
  });
};

module.exports = send;