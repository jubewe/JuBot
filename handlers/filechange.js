const _log = require("../functions/_log");
const _stackname = require("../functions/_stackname");
const _wf = require("../functions/_wf");
const _getallobjectkeystree = require("../functions/_getallobjectkeystree");
const _getbyobjectkeyfromtree = require("../functions/_getbyobjectkeyfromtree");
const isdebug = require("../functions/isdebug");

let filesold = {};
module.exports = () => {
    if(isdebug("filechange")){
        _log(1, `${_stackname("handlers", "filechange")[3]} executed`);
    };
    
    let j = require("../variables/j");
    let changed_files = 0;

    function filechange(files) {
        for(let file in files){
            // if(typeof files[file] === "object") filechange(files[file]);
            // else {
                // }
            if(filesold[file] && filesold[file] !== JSON.stringify(files[file]) && _getallobjectkeystree(j.paths()).includes(file)){
                _wf(_getbyobjectkeyfromtree(j.paths(), file)[0][0], files[file], true);
                changed_files++;
            };
            filesold[file] = JSON.stringify(files[file]);
        };
    };

    filechange(j.files());
    
    if(isdebug("filechange")){
        _log(1, `${_stackname("handlers", "filechange")[3]} executed\t(Changed ${changed_files} files)`);
    };
};