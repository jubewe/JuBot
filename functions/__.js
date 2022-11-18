const fs = require("fs");
const path = require("path");
const _mainpath = require("./_mainpath");

let functiondir = fs.readdirSync(_mainpath("./functions/"), "utf-8");
function __(){
    let f__ = functiondir.filter(func => {
        return func && func.endsWith(".js") && !["_", "__"].includes(func.split(".js")[0]);
    }).map(func => {return [func, undefined, _mainpath(`./functions/${func}`), func.split(".js")[0]]});
    let ff__ = functiondir.filter(func => {
        return func && !func.endsWith(".js") && !["_", "__"].includes(func.split(".js")[0]);
    });

    ff__.map(func => {
        try {
            let functiondir2 = fs.readdirSync(_mainpath(`./functions/${func}`), "utf-8");
            f__.push(...functiondir2.filter(func2 => {
                return func2 && func2.endsWith(".js") && !["_", "__"].includes(func2.split(".js")[0]);
            }).map(func2 => {return [func2, func, _mainpath(`./functions/${func}/${func2}`), func2.split(".js")[0]]}))
        } catch(e){}
    });

    // console.log(f__);
    // console.log(ff__);

    let f_ = {};
    f__.forEach(func => {
        if(!func[1]){
            f_[func[3]] = require(func[2]);
        } else {
            if(!f_[func[1]]) f_[func[1]] = {};
            f_[func[1]][func[3]] = require(func[2]);
        }
    });

    return f_;
};

// console.log(__());

module.exports = __;