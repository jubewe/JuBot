const fs = require("fs");
let { codelog: codelogpath } = require("../variables/paths");
const { date } = require("../variables/varstatic");

function logcode(lcdata){
    if(fs.existsSync(codelogpath)){
        fs.appendFile(codelogpath, `\n${date().toISOString()}\t${lcdata}`, function(e){
            console.error(e)
        })
    } else {
        fs.appendFile(codelogpath, `${date().toISOString()}\t${lcdata}`, function(e){
            console.error(e)
        })
    }
};

module.exports = logcode;