const paths = require("../variables/paths");
const syncfile = require("./_syncfile");
const wf = require("./_wf");

async function part(partchan) {
  return new Promise(function (resolve, reject) {
    let j = require("../variables/j");

    let channels = syncfile(5, paths.clientchannels);

    if (channels.channels.includes(partchan)) {
      channels.channels.splice(channels.channels.indexOf(partchan), 1);
      wf(paths.clientchannels, channels);

      j.client.part(partchan);
      return resolve({ "path": [1, 1], "msg": "Successfully parted channel" });
    } else {
      return reject({ "path": [0], "msg": "Not in channel" });
    }
  });
}

module.exports = part;
