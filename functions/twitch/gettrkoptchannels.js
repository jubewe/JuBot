let files = require("../../variables/files");
const _checkmultiplevaliinobj = require("../_checkmultiplevalinobj");

function gettrkoptchannels(){
    let channels = files.channels;
    let searchparams = ["live","activemods"];
    if([...arguments].length > 1){
        searchparams = [...arguments];
        searchparams.shift();
    }

    let trklivechannels = Object.keys(channels.channels).filter(ch => {
        return (_checkmultiplevaliinobj(channels.channels[ch], ["trackers", searchparams]));
    });

    // console.log(trklivechannels);
    return trklivechannels;
};

module.exports = gettrkoptchannels;