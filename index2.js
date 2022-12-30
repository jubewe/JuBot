const request = require("request");
const _checkmultiplevaliinobj = require("./functions/_checkmultiplevalinobj");
const _randomnum = require("./functions/_randomnum");
const _requestopts = require("./functions/_requestopts");
const _rf = require("./functions/_rf");
const _wf = require("./functions/_wf");
const env = require("dotenv").config().parsed;

// request("https://www.googleapis.com/youtube/v3/search?query=fritzmeinecke", _requestopts(), (e, r) => {
// request(`https://www.googleapis.com/youtube/v3/channels?part=id&id=RuuXzTIr0OoDqI4S0RU6n4FqKEM&key=${env.YT_APIKEY}`, {
// request(`https://www.googleapis.com/youtube/v3/channelSections?part=contentDetails&channelId=fritzmeinecke&key=${env.YT_APIKEY}`, {
// request(`https://www.googleapis.com/youtube/v3/search?q=7+vs+wild&type=video&channelid=UCSyAFJ6cmgYabA0RfPCNuzA&key=${env.YT_APIKEY}`, {method: "GET",}, (e, r) => {
//     if(e){
//         console.error(e);
//     } else {
//         let dat = JSON.parse(r.body);
//         if(dat.items && dat.items[0]){
//             if(dat.items[0].id.videoId){
                
//             }
//         }
//     }
// })

// console.log(_rf("./.git/FETCH_HEAD").split("\t")[0])


// request(`https://api.github.com/repos/jubewe/jubot`, {
//     method: "GET", 
//     headers: {
//         "accept": "application/vnd.github+json"
//     }
// }, (e, r) => {
    
// })

// request("https://github.com/login/oauth/authorize?client_id=5udxck6anc74znp16q3isokjd9pj7m&redirect_uri=https://jubewe.github.io/callback/twitch/validatetoken&scope=public_repo+read:packages+read:project+read:public_key+repo+repo:status", (e, r) => {
//     if(e){
//         console.error(e)
//     } else {
//         console.log(r.body)
//     }
// })

// request("https://tmi.twitch.tv/group/user/jubewe/chatters", (e, r) => {
//     console.log(e || r.body)
// })

const fs = require("fs");
const path = require("path");
// const { j_api_headeradmin } = require("./variables/vars");

let maindir = "./";
let dirmsg = "";
let dir = [];

// maindir.forEach(a => {
//     console.log(`| ${a}`);

//     if(!new RegExp(`\.\\w+$`, "i").test(a)){
//         try {
            
//         } catch(e){}
//     }
// });
let dirreg = () => {return new RegExp("\\.+.+$", "gi")};
/**
 * @param {array} dir2 
 */
function readdir(dir2){
    let tabnum = (dir2 ? dir2.length : 0);
    dir2 = dir2 ?? [];
    try {
        let dir_ = fs.readdirSync(path.resolve(maindir, dir2.join("/")) ?? "");
        [...dir2].forEach(a => {tabnum++;})

        dir_.forEach(a => {
            dirmsg += `\n${" ".repeat(2).repeat(tabnum)} | ${a}`;
            if(![".tmp.driveupload", ".tmp.drivedownload", "node_modules", "todo", "changes",].includes(a) && !dirreg().test(a)){
                try {
                    let dir2_ = fs.readdirSync(path.resolve(maindir, ...dir2, a));
                    if((dir2_ ?? undefined) && !dirreg().test(a)) readdir([...dir2,a]);
                } catch(e){
                    console.error(e);
                }
            }
        });
    } catch(e){}
};

readdir();

console.log(dirmsg);