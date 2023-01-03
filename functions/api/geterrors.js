const request = require("request");
let j = require("../../variables/j");
const urls = require("../../variables/urls");
const _log = require("../_log");
const _stackname = require("../_stackname");
const api_requestheaders = require("./api_requestheaders");

async function geterrors(opt){
    return new Promise((resolve, reject) => {
        if(!j.c().connect.twitch) return reject();
        request(`${urls.api.__url("errors", "GET")}`, {method: "GET", headers: api_requestheaders()}, (e, r) => {
            if(e){
                console.error(new Error(e));
                return reject(e);
            } else {
                if(j.functions()._regex.jsonreg().test(r.body)){
                    let dat = JSON.parse(r.body);
                    _log(1, `${_stackname("api", "get", "errors")[3]} ${dat.data.split("\n").length-1}`);
                    if(opt && [1].includes(opt)){
                        if(dat.status == 200 && dat.data.length > 0){
                            j.client.say(j.env().T_USERNAME, `@JUBOT_ADMIN, Cached ${(dat.data.split("\n").length-1).toFixed(0)} Errors ( ${urls.api._base}:${urls.api._port}${urls.api._endpoints.GET.errors} / \\\\${urls.api._base.replace(/http(s)*\:\/{2}/g, "")}\\pi\\home\\pi\\FTP\\files\\api\\data\\errors.txt )`);
                        }
                    }
                    return resolve(dat);
                } else {
                    _log(2, `${_stackname("api", "get", "errors", "error")[3]} ${r.body}`);
                    return resolve(r.body);
                }
            }
        })
    })
};

module.exports = geterrors;