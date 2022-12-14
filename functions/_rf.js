const fs = require("fs");
const isdebug = require("./isdebug");
const _log = require("./_log");
const _mainpath = require("./_mainpath");
const _staticspacer = require("./_staticspacer");
const _wf = require("./_wf");

/**
 * 
 * @param {string} rfpath rfpath > _mainpath()
 * @param {boolean} parse_json 
 * @returns {file} Read file
 */

function _rf(rfpath, parse_json){
    if(isdebug("functions", "_rf")){
        _log(1, `${_staticspacer("debug", "_rf")} ${rfpath} (JSON: ${parse_json || false})`);
    }
    
    if(!rfpath) throw new Error(`_rf: rfpath is undefined`);

    try {
        if(fs.existsSync(_mainpath(rfpath))){
            let file = fs.readFileSync(_mainpath(rfpath), "utf-8");
            if(rfpath.endsWith(".json") && parse_json){
                if(typeof file === "string" && typeof JSON.parse(file) === "object" && Object.keys(file).length >= 2){
                    return JSON.parse(file);
                } else {
                    if(file.length === 0){
                        _wf(rfpath, {}, true);
                    } 
                    return {};
                }
            } else {
                return file;
            }
        } else {
            throw new Error(`_rf: File does not exist\nPath: ${rfpath}`);
        }
    } catch(e){
        throw new Error(`_rf: Could not read file\n${e}`);
    }
};

module.exports = _rf;