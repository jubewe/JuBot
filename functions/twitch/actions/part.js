const _wf = require("../../_wf");

async function part(partchan) {
  return new Promise(function (resolve, reject) {
    let j = require("../../../variables/j");

    if (j.files().clientchannels.channels.includes(partchan)) {
      j.files().clientchannels.channels.splice(j.files().clientchannels.channels.indexOf(partchan), 1);

      j.client.part(partchan);
      _wf(j.paths().clientchannels, j.files().clientchannels, true);
      return resolve({"path":[1,1],"msg":"Successfully left channel"});
    } else {
      return reject({"path":[0],"msg":"Not in channel"});
    }
  });
}

module.exports = part;