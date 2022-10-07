const fs = require("fs");
const _mainpath = require("./_mainpath");

/**
 * 
 * @param {string} apath 
 * @param {string} adata 
 * @param {boolean} anewline
 */

function _appf(apath, adata, anewline){
    if(!apath) throw new Error(`_wf: apath is undefined`);
    if(!adata) throw new Error(`_wf: adata is undefined`);

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
                    throw new Error(`_wf: typeof JSON.stringify(adata) is ${typeof JSON.stringify(adata)} (expected string)`);
                }
    
                break;
            }
    
            default: {
                throw new Error(`_wf: typeof adata is ${typeof(adata)} (expected string or object)`);
            }
        }
    } catch(e){
        throw new Error(`_wf: Could not write file\n${e}`);
    }
};

module.exports = _appf;