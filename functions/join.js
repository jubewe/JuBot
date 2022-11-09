const paths = require("../variables/paths");
const _wf = require("./_wf");

async function join(jchan, jclient, channelkey) {
  return new Promise(function (resolve, reject) {
    let j = require("../variables/j");
    jclient = jclient || j.client;
    channelkey = channelkey || "channels";
    try {
      let j = require("../variables/j");

      let clientchannels = j.files().clientchannels;

      if (Array.isArray(jchan)) {
        [...jchan].map(c => {
          if (!clientchannels[channelkey].includes(c)) {
            clientchannels[channelkey].push(c);
          }
        });
      } else {
        if (!clientchannels[channelkey].includes(jchan)) {
          clientchannels[channelkey].push(jchan);
        }
        jchan = [jchan];
      }
      _wf(paths.clientchannels, clientchannels);
      jclient.joinAll(jchan);
      return resolve({path:[1], msg:"Successfully joined channel(s)"});
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
