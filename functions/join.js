const syncfile = require("./_syncfile");
const wf = require("./_wf");

async function join(jchan) {
  return new Promise(function (resolve, reject) {
    try {
      let j = require("../variables/j");

      let joinchannels = syncfile(5, j.paths().clientchannels);

      if (Array.isArray(jchan)) {
        [...jchan].map((c) => {
          if (!joinchannels.channels.includes(c)) {
            joinchannels.channels.push(c);
          }
        });
      } else {
        if (!joinchannels.channels.includes(jchan)) {
          joinchannels.channels.push(jchan);
        }
      }
      wf(j.paths().clientchannels, joinchannels);
      j.client.joinAll(jchan);
      return resolve({ path: [1], msg: "Successfully joined channel" });
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
