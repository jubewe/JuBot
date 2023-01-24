let nonarr = [null, undefined];
let replacer = /[@#-]/g;
let splitter = "-󠀀~󠀀-󠀀JUBOT󠀀-󠀀~󠀀-";
const starttime = Date.now();
const _mainpath = require("../functions/_mainpath");

module.exports = {
    date: () => {return new Date(new Date().setMinutes(new Date().getMinutes()-new Date().getTimezoneOffset()))},
    date_: () => {return new Date(new Date().setMinutes(new Date().getMinutes()-new Date().getTimezoneOffset())).toISOString().split(".")[0].replace("T", " ")},
    nonarr: nonarr,
    splitter: splitter,
    replacer: replacer,
    starttime: starttime,
    e: () => {return require("dotenv").config({path: _mainpath("./.env")}).parsed}

}