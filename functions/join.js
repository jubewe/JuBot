const syncfile = require("./_syncfile");
const wf = require("./_wf");

async function join(jchan, jclient, channelkey) {
  return new Promise(function (resolve, reject) {
    let j = require("../variables/j");
    jclient = (jclient ? jclient : j.client);
    channelkey = (channelkey ? channelkey : "channels")
    try {
      let j = require("../variables/j");

      let joinchannels = syncfile(5, j.paths().clientchannels);

      if (Array.isArray(jchan)) {
        [...jchan].map((c) => {
          if (!joinchannels[channelkey].includes(c)) {
            joinchannels[channelkey].push(c);
          }
        });
      } else {
        if (!joinchannels[channelkey].includes(jchan)) {
          joinchannels[channelkey].push(jchan);
        }
      }
      wf(j.paths().clientchannels, joinchannels);
      jclient.joinAll(jchan);
      return resolve({ path: [1], msg: "Successfully joined channel" });
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
