const _staticspacer = require("./_staticspacer");

function _stackname(){
    let stacknames = require("../variables/stacknames");
    let stackret = [...arguments].map(a => {
        return stacknames[a] || `[${a.toUpperCase()}]`;
    });
    return [stackret.join(" "), stackret, stackret.map(s => {return _staticspacer(2, s)}), stackret.map(s => {return _staticspacer(2, s)}).join(" ")];
};

module.exports = _stackname;