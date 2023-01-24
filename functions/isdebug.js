const _checkmultiplevaliinobj = require("./_checkmultiplevalinobj");
const _mainpath = require("./_mainpath");

function isdebug(){
    let config = require(_mainpath("./config.json"));
    return _checkmultiplevaliinobj(config.debug, [...arguments]);
};

module.exports = isdebug;