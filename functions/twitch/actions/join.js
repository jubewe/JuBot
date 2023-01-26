const _returnplural = require("../../_returnplural");
const _wf = require("../../_wf");

async function join(jchan, jclient, channelkey) {
  return new Promise(function (resolve, reject) {
    let j = require("../../../variables/j");
    jclient = jclient || j.client;
    channelkey = channelkey || "channels";
    let r = {
      "resolve": 0,
      "reject": 0
    }
    try {
      if (Array.isArray(jchan)) {
        [...jchan].map(c => {
          if (!j.files().clientchannels[channelkey].includes(c)) {
            j.files().clientchannels[channelkey].push(c);
            r.resolve++;
          } else {
            r.reject++;
          }
        });
      } else {
        if (!j.files().clientchannels[channelkey].includes(jchan)) {
          j.files().clientchannels[channelkey].push(jchan);
          r.resolve++;
        } else {
          r.reject++;
        }
        jchan = [jchan];
      }
      _wf(j.paths().clientchannels, j.files().clientchannels, true);
      for(let jchan_ in jchan){
        j.client.join(jchan[jchan_]);
      };
      return resolve({path:[1], msg:`Successfully joined ${r.resolve}/${r.reject} channel${_returnplural(jchan)}`,"r":r});
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
