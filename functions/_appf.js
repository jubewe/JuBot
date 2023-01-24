const fs = require("fs");
const isdebug = require("./isdebug");
const _log = require("./_log");
const _mainpath = require("./_mainpath");
const _staticspacer = require("./_staticspacer");

/**
 * 
 * @param {string} apath 
 * @param {string} adata 
 * @param {boolean} anewline
 */

function _appf(apath, adata, anewline){
    if(isdebug("functions", "_appf")){
        _log(1, `${_staticspacer("debug", "_appf")} ${apath} (${Buffer.from(adata, "utf-8").byteLength} b)`);
    }
    if(!apath) throw new Error(`_appf: apath is undefined`);
    if(!adata) throw new Error(`_appf: adata is undefined`);

    if(!apath.startsWith(_mainpath(""))){
        apath = _mainpath(apath);
    }

    try {
        switch (typeof adata){
            case "string": {
                fs.appendFileSync(apath, (anewline ? `\n` : '') + adata, "utf-8");
                break;
            }
    
            case "object": {
                if(typeof JSON.stringify(adata) === "string"){
                    fs.appendFileSync(apath, (anewline ? `\n` : '') + JSON.stringify(adata), "utf-8");
                } else {
                    throw new Error(`_appf: typeof JSON.stringify(adata) is ${typeof JSON.stringify(adata)} (expected string)`);
                }
    
                break;
            }
    
            default: {
                throw new Error(`_appf: typeof adata is ${typeof(adata)} (expected string or object)`);
            }
        }
    } catch(e){
        throw new Error(`_appf: Could not write file\n${e}`);
    }
};

module.exports = _appf;