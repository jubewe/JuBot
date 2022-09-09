const fs = require("fs");
const mainpath = require("./_mainpath");

/**
 * 
 * @param {string} wfpath wfpath > mainpath()
 * @param {string | object} wffile wffile: string | object
 * @returns nothing
 */

function _wf(wfpath, wffile){
    if(!wfpath) throw new Error(`_wf: wfpath is undefined`);
    if(!wffile) throw new Error(`_wf: wffile is undefined`);

    try {
        switch (typeof wffile){
            case "string": {
                fs.writeFileSync(mainpath(wfpath), wffile, "utf-8");
                break;
            }
    
            case "object": {
                if(typeof JSON.stringify(wffile) === "string"){
                    fs.writeFileSync(mainpath(wfpath), JSON.stringify(wffile), "utf-8");
                } else {
                    throw new Error(`_wf: typeof JSON.stringify(wffile) is ${typeof JSON.stringify(wffile)} (expected string)`);
                }
    
                break;
            }
    
            default: {
                throw new Error(`_wf: typeof wffile is ${typeof(wffile)} (expected string or object)`);
            }
        }
    } catch(e){
        throw new Error(`_wf: Could not write file\n${e}`);
    }
};

module.exports = _wf;