const _staticspacer = require("./_staticspacer");

function _stackname(){
    let stacknames = require("../variables/stacknames");
    let stackret = [...arguments].map(a => {
        if(typeof a === "string"){
            return stacknames[a] || `[${a.toUpperCase()}]`;
        } else {
            return `nameerr`;
        }
    });
    let stackcolor = (stackret.some(s2 => {return s2 == "[ERROR]"}) ? "\x1b[4;31m" : "\x1b[4;1;36m");
    return [
        stackret.join(" "), 
        stackret, 
        stackret.map(s => {return _staticspacer(2, s, stackcolor)}), 
        stackret.map(s => {return _staticspacer(2, s, stackcolor)}).join(" ")
    ];
};

module.exports = _stackname;