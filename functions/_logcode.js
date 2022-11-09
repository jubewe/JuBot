const fs = require("fs");
const paths = require("../variables/paths");
function date_(){return new Date(new Date().setMinutes(new Date().getMinutes()-new Date().getTimezoneOffset())).toISOString().split(".")[0].replace("T", " ")};

function logcode(lcdata){
    if(fs.existsSync(paths.logcode)){
        fs.appendFile(paths.logcode, `\n${date_()}\t${lcdata}`, function(e){
            console.error(e);
        })
    } else {
        fs.appendFile(paths.logcode, `${date_()}\t${lcdata}`, function(e){
            console.error(e);
        })
    }
};

module.exports = logcode;