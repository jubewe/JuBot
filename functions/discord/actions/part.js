async function part(partchan) {
  return new Promise(function (resolve, reject) {
    let j = require("../../../variables/j");

    if (j.files().channels.channels.includes(partchan)) {
      j.files().channels.channels.splice(j.files().channels.channels.indexOf(partchan), 1);
      // _wf(paths.clientchannels, j.files().channels);

      j.client.part(partchan);
      return resolve({"path":[1,1],"msg":"Successfully parted channel"});
    } else {
      return reject({"path":[0],"msg":"Not in channel"});
    }
  });
}

module.exports = part;
