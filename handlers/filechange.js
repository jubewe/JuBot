const _log = require("../functions/_log");
const _stackname = require("../functions/_stackname");
const _wf = require("../functions/_wf");
const _getallobjectkeystree = require("../functions/_getallobjectkeystree");
const _getbyobjectkeyfromtree = require("../functions/_getbyobjectkeyfromtree");
const isdebug = require("../functions/isdebug");
const _rf = require("../functions/_rf");
const files = require("../variables/files");
const paths = require("../variables/paths");

let filesold = {};
module.exports = () => {
    if(isdebug("filechange")){
        _log(1, `${_stackname("handlers", "filechange")[3]} executed`);
    };
    
    let changed_files = 0;
    let readnew_files = 0;

    function filechange(files_) {
        for(let file in files_){
            if(!_getbyobjectkeyfromtree(paths, file)[0]?.[0]) return;
            let filenew = _rf(_getbyobjectkeyfromtree(paths, file)[0]?.[0], false);
            if(filesold[file] && filesold[file] !== JSON.stringify(files_[file]) && _getallobjectkeystree(paths).includes(file)){
                _wf(_getbyobjectkeyfromtree(paths, file)[0][0], files_[file], true);
                changed_files++;
            } else if(filesold[file] && filesold[file] === JSON.stringify(files_[file]) && filesold[file] != filenew && JSON.stringify(files_[file]) != filenew){
                filesold[file] = filenew;
                try {
                    files_[file] = JSON.parse(filenew);
                    _wf(_getbyobjectkeyfromtree(paths, file)[0][0], JSON.stringify(JSON.parse(filenew)));
                } catch(e){
                    files_[file] = filenew;
                }
                readnew_files++;
            };
            
            filesold[file] = JSON.stringify(files_[file]);
        };
    };

    filechange(files);
    
    if(isdebug("filechange")){
        _log(1, `${_stackname("handlers", "filechange")[3]} executed\t(Changed ${changed_files} and Re-read ${readnew_files} files)`);
    };
}