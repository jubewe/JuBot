let replacevariables = require("./replacevariables");
const _log = require("./_log");
const _staticspacer = require("./_staticspacer");

/**
 * 
 * @param {number} smode 
 * @param {string | null | undefined} schan 
 * @param {string} smsg 
 * @param {number | null | undefined} sparentid 
 * @param {boolean | null | undefined} sfirst 
 * @param {boolean | undefined} smulti 
 * @param {boolean | null | undefined} sreplacer
 * @returns 
 */

async function send(smode, schan, smsg, sparentid, sfirst, smulti, sreplacer) {
  let j;
  if(typeof schan === "object"){
    j = schan;
    schan = null;
  } else {
    j = require("../variables/j");
  }
  schan = j.variables().nonarr.includes(schan) ? j.message._.chan : schan;
  smulti = ([null, undefined].includes(smulti) ? undefined : smulti);

  if(j.message._.type === "WHISPER"){
    smode = 1;
    schan = j.message.userstate.username;
  };

  let sendtrys = 1+1;
  let sendretrytimeout = 3000;

  if([3, "tag"].includes(smode)){
    smsg = j.message._.usertag_ + smsg;
  }

  if(sreplacer){
    smsg = await replacevariables(j, smsg);
  }

  smsg = smsg.replace(new RegExp("\n|\\n", "g"), "\\\n");
  smsg = smsg.replace(new RegExp("\r|\\r", "g"), "\\\r");

  if(smsg.length > 500){
    let smsges = _splitmsg(smsg, " ", 500, 1, 1);
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
    if ([null, undefined, 0, "channel", 3, "user"].includes(_smode)) {
      _send();
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
      }
    } else if ([1, "whisper", "dm"].includes(_smode)) {
      _whisper();
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
    } else if ([2, "reply"].includes(_smode)) {
      _sparentid = (j.variables().nonarr.includes(_sparentid) ? j.message.message.id : _sparentid);
      _reply();
      function _reply(){
        if(sendtrys > 0){
          sendtrys--;
          j.client.reply(_schan, _sparentid, (_sfirst === false ? "" : j.vars().botnamebeta()) + _smsg).catch((e) => {
            console.error(new Error(e));
            (async () => {
              setTimeout(() => {
                _reply();
              }, sendretrytimeout);
            })();
          });
        } else {
          return;
        }
      };
    }
  }
};

module.exports = send;