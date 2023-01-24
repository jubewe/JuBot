const fs = require("fs");
const _wf = require("./_wf");

async function _clearfile(filepath, filecontent) {
    return new Promise((resolve, reject) => {
        if(fs.existsSync(filepath)){
            _wf(filepath, filecontent, true)
            return resolve(true);
        } else {
            return reject({path:[opt,0],msg:"filepath not found"});
        }
    });
};

module.exports = _clearfile;