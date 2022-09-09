function send(smode, schan, smsg, sparentid, sfirst) {
  let j = require("../variables/j");
  schan = j.variables().nonarr.includes(schan) ? j.message._.chan : schan;

  if ([null, undefined, 0, "channel"].includes(smode)) {
    j.client.say(
      schan,
      (sfirst === false ? "" : j.variables().botnamebeta()) + smsg
    );
  } else if ([1, "whisper", "dm"].includes(smode)) {
    j.client.whisper(
      schan.replace(j.replacer, ""),
      j.variables().botnamebeta() + smsg
    );
  } else if ([2, "reply"].includes(smode)) {
    sparentid = (j.variables().nonarr.includes(sparentid) ? j.message.message.replyMessageID : sparentid);
    j.client.say(
      schan,
      (sfirst === false ? "" : j.variables().botnamebeta()) 
      + (j.variables().nonarr.includes(sparentid) ? j.message._.usertag : "") + smsg,
      (j.variables().nonarr.includes(sparentid) ? {} : {replyTo: sparentid})
    );
  }
};

module.exports = send;
