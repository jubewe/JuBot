const _checkenv = require("../functions/_checkenv");
const _rf = require("../functions/_rf");
const { env } = require("./j")

module.exports = {
    botname: () => {return _checkenv(null, "OS", 0, "Windows_NT") ? "Bot BETA " : "Bot "},
    botnamebeta: () => {return _checkenv(null, "OS", 0, "Windows_NT") ? "[BETA] " : ""},
    // botversion: () => {return require("node:child_process").execSync("npm pkg get version")},
    botversion: () => {return require("../package.json").version},
    botgitcommitid: () => {return _rf("./.git/FETCH_HEAD").split("\t")[0]},
    botgitrepository: () => {return require("../package.json").homepage.split("#")[0]},
    j_api_headeradmin: () => {return {"username": env().J_API_ADMIN_USERNAME, "password": env().J_API_ADMIN_PASSWORD}}

};