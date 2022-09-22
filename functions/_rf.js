const fs = require("fs");
const _mainpath = require("./_mainpath");
const _wf = require("./_wf");

/**
 * 
 * @param {string} rfpath rfpath > _mainpath()
 * @param {boolean} parse_json 
 * @returns {file} Read file
 */

function _rf(rfpath, parse_json){
    if(!rfpath) throw new Error(`_rf: rfpath is undefined`);

    try {
        if(fs.existsSync(_mainpath(rfpath))){
            let file = fs.readFileSync(_mainpath(rfpath), "utf-8");
            if(rfpath.endsWith(".json") && parse_json){
                if(typeof file === "string" && typeof JSON.parse(file) === "object" && Object.keys(file).length >= 2){
                    return JSON.parse(file);
                } else {
                    if(file.length === 0){
                        _wf(rfpath, {});
                    } 
                    return {};
                }
            } else {
                return file;
            }
        } else {
            throw new Error(`_rf: File does not exist`);
        }
    } catch(e){
        throw new Error(`_rf: Could not read file\n${e}`);
    }
};

module.exports = _rf;