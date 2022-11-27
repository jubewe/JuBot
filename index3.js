const _rf = require("./functions/_rf");
const _wf = require("./functions/_wf");

// let logf = _rf("./log.txt");
// let modactions = {};
let modactions = _rf("./log.json", true);
let splitter = "-󠀀~󠀀-󠀀JUBOT󠀀-󠀀~󠀀-";

// for(let log in logf.split("\n")){
//     let ls = logf.split("\n")[log].split(splitter);
//     if(ls[2] == "461098086"){
//         if(!modactions[ls[4]]) modactions[ls[4]] = {"delete":0,"timeout":0,"ban":0,"unban":0,"untimeout":0,"undefined":0,"all":0};
//         modactions[ls[4]][ls[3]]++;
//         modactions[ls[4]].all++;
//     }
// }

// _wf("./log.json", modactions, true);
let modactions2 = [];

Object.keys(modactions).forEach(a => {
    modactions2.push({[a]:modactions[a]});
});

_wf("./logssort", modactions2, true)