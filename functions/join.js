const syncfile = require("./_syncfile");
const wf = require("./_wf");

function join(jchan){
    let j = require("../variables/j");

    let channels = syncfile(5, j.paths().channels);
    
    [...jchan].map(c => {
        if(!channels.channels.includes(c)){
            channels.channels.push(c);
        }
    })
    wf(j.paths().channels, channels);
    j.client.joinAll(jchan);
};

module.exports = join;