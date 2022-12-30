const _log = require("../../../functions/_log");

module.exports = () => {
    let j = require("../../../variables/j");

    j.ws.server.addListener("listening", require("../../../handlers/ws/server/listening"));
    j.ws.server.addListener("connection", require("../../../handlers/ws/server/connection"));
    j.ws.server.addListener("close", require("../../../handlers/ws/server/close"));
    j.ws.server.addListener("headers", require("../../../handlers/ws/server/headers"));
    j.ws.server.addListener("error", require("../../../handlers/ws/server/error"));
};