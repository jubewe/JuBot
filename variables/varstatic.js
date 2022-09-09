const checkenv = require("../functions/_checkenv");

let nonarr = [null, undefined];
let replacer = /[@#-󠀀]/g;
let splitter = "-󠀀~󠀀-󠀀JUBOT󠀀-󠀀~󠀀-";
const starttime = Date.now();

module.exports = {
    date: () => {return new Date(new Date().setHours(new Date().getHours()+2))},
    date_: () => {return new Date(new Date().setHours(new Date().getHours()+2)).toISOString().split(".")[0].replace("T", " ")},
    nonarr: nonarr,
    splitter: splitter,
    replacer: replacer,
    starttime: starttime,
    botname: () => {return checkenv(null, "OS", 0, "Windows_NT") ? "Bot BETA " : "Bot "},
    botnamebeta: () => {return checkenv(null, "OS", 0, "Windows_NT") ? "[BETA] " : ""},

}