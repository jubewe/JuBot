const fs = require("fs");
const _mainpath = require("./_mainpath");

let functiondir = fs.readdirSync(_mainpath("./functions/"), "utf-8");
function __(){
    return functiondir.filter(func => {
        return functiondir[func].endsWith(".js") && !["_", "__"].includes(functiondir[func].split(".js")[0])
    })
};

module.exports = __;