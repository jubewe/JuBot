const request = require("request");
const api_requestheaders = require("./api/api_requestheaders");
const _dc_error = require("./discord/_dc_error");

async function _error (error){
    // process.emit("unhandledRejection", new Error(error));
    let urls = require("../variables/urls");
    request(urls.api.__url("error", "POST"), {method: "POST", headers: api_requestheaders(null, null, JSON.stringify(`[JUBOT] ${error.stack || ""}: ${error.message || ""} ${error.stack ? error.stack.toString() : ""}`))}, (e, r) => {
        if(e){
            console.error(new Error(e));
        } else {
            if(r.statusCode !== 200) console.error(new Error(r.body));
        }
    });
    _dc_error(null, error).catch(e => {console.error(new Error(e))});
};
module.exports = _error;