const request = require("request");
const urls = require("../variables/urls");
const api_requestheaders = require("./api/api_requestheaders");

function _error (error){
    // process.emit("unhandledRejection", new Error(error));
    request(`${urls.api.__url("error", "POST")}`, {method: "POST", headers: api_requestheaders(null, null, JSON.stringify(`[JUBOT] ${error.stack || ""}: ${error.message || ""} ${error.stack ? error.stack.toString() : ""}`))}, (e, r) => {
        if(e){
            console.error(new Error(e));
        } else {
            if(r.statusCode === 200){} else {
                console.error(new Error(r.body));
            }
        }
    });
};
module.exports = _error;