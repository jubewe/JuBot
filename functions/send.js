const _log = require("./_log");
const _staticspacer = require("./_staticspacer");

function send(smode, schan, smsg, sparentid, sfirst) {
  let j = require("../variables/j");
  schan = j.variables().nonarr.includes(schan) ? j.message._.chan : schan;

  if(j.message._.type === "WHISPER"){
    smode = 1;
    schan = j.message.userstate.username;
  }

  if ([null, undefined, 0, "channel"].includes(smode)) {
    j.client.say(
      schan,
      (sfirst === false ? "" : j.vars().botnamebeta()) + smsg
    );
  } else if ([1, "whisper", "dm"].includes(smode)) {
    _log(0, `${_staticspacer(1, "[W] ->")} ${_staticspacer(2, schan)} ${smsg}`);
    j.client.whisper(
      schan,
      j.vars().botnamebeta() + smsg
    );
  } else if ([2, "reply"].includes(smode)) {
    sparentid = (j.variables().nonarr.includes(sparentid) ? j.message.message.id : sparentid);
    j.client.reply(
      schan, sparentid, (sfirst === false ? "" : j.vars().botnamebeta()) + smsg
    );
  }
};

module.exports = send;
