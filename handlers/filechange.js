const _log = require("../functions/_log");
const _stackname = require("../functions/_stackname");
const _wf = require("../functions/_wf");

let filesold = {};
module.exports = () => {
    // _log(1, `${_stackname("handlers", "filechange")[3]} executed`);
    
    let j = require("../variables/j");
    let changed_files = 0;
    
    for(let file in j.files()){
        if(filesold[file] && filesold[file] !== JSON.stringify(j.files()[file]) && j.paths()[file]){
            _wf(j.paths()[file], j.files()[file], true);
            changed_files++;
        }
        
        filesold[file] = JSON.stringify(j.files()[file]);
    }
    
    _log(1, `${_stackname("handlers", "filechange")[3]} executed\t(Changed ${changed_files} files)`);
};