const syncfile = require("./_syncfile");
const wf = require("./_wf");

async function join(jchan) {
  return new Promise(function (resolve, reject) {
    try {
      let j = require("../variables/j");

      let channels = syncfile(5, j.paths().channels);

      if (Array.isArray(jchan)) {
        [...jchan].map((c) => {
          if (!channels.channels.includes(c)) {
            channels.channels.push(c);
          }
        });
      } else {
        if (!channels.channels.includes(jchan)) {
          channels.channels.push(jchan);
        }
      }
      wf(j.paths().channels, channels);
      j.client.joinAll(jchan);
      return resolve({ path: [1], msg: "Successfully joined channel" });
    } catch(e){
      return reject(e);
    }
  });
}

module.exports = join;
