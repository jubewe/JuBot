const _wf = require("../../_wf");

async function join(jchan, jclient, channelkey) {
  return new Promise(function (resolve, reject) {
    let j = require("../../../variables/j");
    jclient = jclient || j.client;
    channelkey = channelkey || "channels";
    try {
      if (Array.isArray(jchan)) {
        [...jchan].map(c => {
          if (!j.files().clientchannels[channelkey].includes(c)) {
            j.files().clientchannels[channelkey].push(c);
          }
        });
      } else {
        if (!j.files().clientchannels[channelkey].includes(jchan)) {
          j.files().clientchannels[channelkey].push(jchan);
        }
        jchan = [jchan];
      }
      _wf(j.paths().clientchannels, j.files().clientchannels, true);
      jclient.joinAll(jchan);
      return resolve({path:[1], msg:"Successfully joined channel(s)"});
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
