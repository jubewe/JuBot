const _checkenv = require("../functions/_checkenv")
const { env } = require("./j")

module.exports = {
    botname: () => {return _checkenv(null, "OS", 0, "Windows_NT") ? "Bot BETA " : "Bot "},
    botnamebeta: () => {return _checkenv(null, "OS", 0, "Windows_NT") ? "[BETA] " : ""},
    j_api_headeradmin: () => {return {"username": env().J_API_ADMIN_USERNAME, "password": env().J_API_ADMIN_PASSWORD}}

};