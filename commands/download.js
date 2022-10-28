const request = require("request");
const api_requestheaders = require("../functions/api/api_requestheaders");
const _wf = require("../functions/_wf");
let j = require("../variables/j");

module.exports = {
    name: "download",
    id: "global_commands_download",
    aliases: [],
    state: 1,
    add_version: "0.0.8",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async () => {
        j = require("../variables/j");

        if(j.message._.args()[0]){
            j.send(2, j, `Started downloading, this might take some time Waiting`);
            let url = j.message._.args()[0];
            j.modules.request(`${j.urls().api.__url("upload", "POST")}`, {
                method: "POST",
                headers: {
                    ...api_requestheaders(null, null), "filename":`${Date.now()}_jubot`, 
                    "url": url
                }
                // Buffer.from(r.body, "base64").toString("base64")
            },
            (e2, r2) => {
                if(e2){
                    console.error(new Error(e2));
                    j.send(2, j, `Error: Could not download file ${e2.stack} ${e2.message}`);
                } else {
                    if(JSON.parse(r2.body) && JSON.parse(r2.body).status === 201){
                        let dat = JSON.parse(r2.body);
                        j.send(2, j, `Successfully downloaded file (Size: ${(dat.data.size/1048576).toFixed(2)} mb), Path: (Server) ${dat.data.path}, (Client) \\\\JUPI\\nas\\MSD128_NAS\\files\\upload\\${dat.data.name}`);
                    } else {
                        console.log(r2.body)
                        j.send(2, j, `Error: Could not upload file to server`);
                    }
                }
            })
            /*
            j.modules.request.post(url, {method: "GET", encoding: null}, (e, r) => {
                if(e){
                    console.error(new Error(e));
                    j.send(2, j, `Error: Could not request url (${e.message})`);
                } else {
                    console.log(r.caseless.get("content-type"));
                    console.log(r.body);
                    j.modules.request.post(`${j.urls().api.__url("upload", "POST")}`, {
                        headers: {...api_requestheaders(null, null), "filename":`${Date.now()}_jubot`, "filetype": `${r.caseless.get("content-type").split("/")[1]}`,
                        url: }
                        // Buffer.from(r.body, "base64").toString("base64")
                    },
                    (e2, r2) => {
                        if(e2){
                            console.error(new Error(e2));
                        } else {
                            console.log(r2.body);
                        }
                    })
                    j.send(2, j, `👉 Console`);
                }
            })*/
        } else {
            j.send(2, j, `Error: No url given`);
        }
    }
}