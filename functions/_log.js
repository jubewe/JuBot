function date_(){return new Date(new Date().setMinutes(new Date().getMinutes()-new Date().getTimezoneOffset())).toISOString().split("Z")[0].replace("T", " ")};
const _returner = require("./_returner.js");

/**
 * 
 * @param {number} logopt 
 * @param {string} logmsg 
 * @param {string} logcolorfg 
 * @param {string} logcolorbg 
 */

function _log(logopt, logmsg, logcolorfg, logcolorbg){
    // 0 = none, 1 = info (green), 2 = error (red), 3 = custom
    let logcolors = ["reset", "bright", "dim", "underscore", "blink", "reverse", "hidden", "fgblack", 
        "fgred", "fggreen", "fgyellow", "fgblue", "fgmagenta", "fgcyan", "fgwhite", "bgblack", "bgred", 
        "bggreen", "bgyellow", "bgblue", "bgmagenta", "bgcyan", "bgwhite"];
    let logcolorsa = ["0", "1", "2", "4", "5", "7", "8", "30", "31", "32", "33", "34", "35", "36", 
        "37", "40", "41", "42", "43", "44", "45", "46", "47"];
    if(logcolorfg !== undefined && logcolorfg !== 0){
        if(!isNaN(logcolorfg)){
            logcolorfg = `\x1b[${logcolorfg}m`;
        } else {
            if(logcolors.includes(logcolorfg)){
                logcolorfg = `\x1b[${logcolorsa[logcolors.indexOf(logcolorfg)]}m`;
            } else {
                logcolorfg = `\x1b[0m`;
            }
        }
    } else {
        if(logcolorfg !== undefined){
            logcolorfg = "\x1b[0m";
        }
    }

    if(logcolorbg !== undefined && logcolorbg !== 0){
        if(!isNaN(logcolorbg)){
            logcolorbg = `\x1b[${logcolorbg}m`;
        } else {
            if(logcolors.includes(logcolorbg)){
                logcolorbg = `\x1b[${logcolorsa[logcolors.indexOf(logcolorbg)]}m`;
            } else {
                logcolorbg = `\x1b[0m`;
            }
        }
    } else {
        if(logcolorbg !== undefined){
            logcolorbg = "\x1b[0m";
        }
    }

    if(logopt === 0){
        console.log(`${_returner(3, logcolorbg, undefined, "")}${_returner(3, logcolorfg, undefined, "")} ${date_()}\x1b[0m${_returner(3, logcolorbg, undefined, "")}${_returner(3, logcolorfg, undefined, "")} \x1b[0m > ${logmsg}`);
        // none
    } else if(logopt === 1){
        console.info(`${_returner(3, logcolorbg, undefined, "\x1b[43m")}${_returner(3, logcolorfg, undefined, "\x1b[30m")} ${date_()}\x1b[0m${_returner(3, logcolorbg, undefined, "\x1b[43m")}${_returner(3, logcolorfg, undefined, "\x1b[30m")} \x1b[0m > ${logmsg}`);
        // yellow
    } else if(logopt === 2){
        console.error(`${_returner(3, logcolorbg, undefined, "\x1b[41m")}${_returner(3, logcolorfg, undefined, "")} ${date_()}\x1b[0m${_returner(3, logcolorbg, undefined, "\x1b[41m")}${_returner(3, logcolorfg, undefined, "")} \x1b[0m > ${logmsg}`);
        // red
    }
};

module.exports = _log;