const fs = require("fs");
const path = require("path");
const _mainpath = require("./functions/_mainpath");

let dir = fs.readdirSync(path.resolve(_mainpath(""), "../JuBot_old"));

let folders = dir.map(v => {return v.match(new RegExp(`\\w{2}\-`))});

console.log(folders);