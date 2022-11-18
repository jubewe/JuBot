let replacevariables = require("../replacevariables");
const _log = require("../_log");
const _staticspacer = require("../_staticspacer");
const _splitmsg = require("../_splitmsg");
const _pixelize = require("../_pixelize");

/**
 * 
 * @param {number} smode 
 * @param {string | null | undefined} schan 
 * @param {string} smsg 
 * @param {number | null | undefined} sparentid 
 * @param {boolean | null | undefined} sfirst 
 * @param {boolean | undefined} smulti 
 * @param {boolean | null | undefined} sreplacer
 */

async function send(smode, schan, smsg, sparentid, sfirst, smulti, sreplacer) {
  let j_;
  if(typeof schan === "object"){
    j_ = schan;
    schan = null;
  } 
  // console.log(j_.message.channel);
  let j = require("../../variables/j");
  schan = global.variables.varstatic.nonarr.includes(schan) ? j_.message._.chan : schan;
  smulti = global.variables.varstatic.nonarr.includes(smulti) ? undefined : smulti;

  if(j_ && j_.message._.type === "WHISPER"){
    smode = 1;
    schan = j_.message.userstate.username;
  };

  if(j_ && j_.message._.modified_channel){
    smode = 2;
    schan = j_.message._.modified_channel.name;
    smsg = `[in ${_pixelize(j_.message.channel.name)} (${j_.message.channel.id})] ${smsg}`;
  }

  let sendtrys = 3;
  let sendretrytimeout = j.c().timeouts.sendretrytimeout;

  if([3, "tag"].includes(smode)){
    smsg = j_.message._.usertag_ + smsg;
  }

  if(j_ && sreplacer){
    smsg = await replacevariables(j_, smsg);
  }

  smsg = smsg.replace(new RegExp("\n|\\n", "g"), "\\\n");
  smsg = smsg.replace(new RegExp("\r|\\r", "g"), "\\\r");
  if(smsg.length > 500){
    let smsges = _splitmsg(smsg, ",", 500, 1, 1);
    // console.log(smsges)
    if(smsges.length > 3 && !smulti){
      _send(smode, schan, `<Error: Too long message>`, sparentid, true); 
      return;
    }
    for(i = 0; i < smsges.length; i++){
      let smsg_ = smsges[i];
      _send(smode, schan, smsg_, sparentid, (i === 0 ? true : false));
    }
    
  } else if(smsg.includes("\n")){
    let smsges = smsg.split("\n");
    for(i = 0; i < smsges.length; i++){
      let smsg_ = smsges[i];
      _send(smode, schan, smsg_, sparentid, (i === 0 ? true : false));
    }
  } else {
    _send(smode, schan, smsg, sparentid, sfirst)
  }
  
  async function _send(_smode, _schan, _smsg, _sparentid, _sfirst){
    function _send(){
      if(sendtrys > 0){
        sendtrys--;
        j.client.privmsg(_schan, (_sfirst === false ? "" : j.vars().botnamebeta()) + _smsg)
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
        j.client.whisper(
          _schan,
          j.vars().botnamebeta() + _smsg
        )
        .then(w => {
          _log(0, `${_staticspacer(1, "[W] ->")} ${_staticspacer(2, _schan)} ${_smsg}`);
        })
        .catch((e) => {
          console.error(new Error(e));
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
        j.client.reply(_schan, _sparentid, (_sfirst === false ? "" : j.vars().botnamebeta()) + _smsg).catch((e) => {
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
      _sparentid = (global.variables.varstatic.nonarr.includes(_sparentid) ? j_.message.message.id : _sparentid);
      _reply();
    }
  }
};

module.exports = send;