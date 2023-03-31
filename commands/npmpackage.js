const { j_: cl_j_ } = require("../classes/classes").twitch;
const dayjs = require("dayjs");

const request = require("request");
const _cleantime = require("../functions/_cleantime");
const _returnerr = require("../functions/_returnerr");
let j = require("../variables/j");
module.exports = {
    name: "npmpackage",
    id: "global_commands_npmpackage",
    aliases: [],
    state: 1,
    add_version: "0.3.1",
    add_user: "jubewe",
    permission: j.c().perm.default,
    cooldown: -1,
    cooldown_user: -1,
    /** @param {cl_j_} j_ */
    exec: async (j_) => {
        let packagename = (j_.message.messageArguments[1] ?? "oberknecht-client");

        request(`https://registry.npmjs.com/${packagename}`, (e, r) => {
            if (e) return j_.message.reply(`Error: Could not request package: ${_returnerr(e)}`);

            let dat = JSON.parse(r.body);

            let latestversion = dat.versions[dat["dist-tags"].latest];

            let resp = `NPM Package Info for ${dat.name}: Created on ${dayjs(new Date(dat.time.created)).format("YYYY-MM-DD")} `
                + `(${_cleantime((Date.now() - new Date(dat.time.created).getTime()), 4).time.join(" ")} ago); `
                + `Latest commit published on ${dayjs(new Date(dat.time[dat["dist-tags"].latest])).format("YYYY-MM-DD")} `
                + `(${_cleantime((Date.now() - new Date(dat.time[dat["dist-tags"].latest])), 4).time.join(" ")} ago); `
                + `Author: ${dat.author.name} (https://www.npmjs.com/~${dat.author.name.toLowerCase()}); `
                + `Versions: ${Object.keys(dat.versions).length}, Latest: ${dat["dist-tags"].latest}; `
                + `Files: ${latestversion.dist.fileCount}; `
                + `Size: ${latestversion.dist.unpackedSize/1000} kb; `
                + `License: ${dat.license}; `
                + `Dependencies [${Object.keys(latestversion.dependencies).length}]: ${Object.keys(latestversion.dependencies).map(a => `${a} (${latestversion.dependencies[a]})`).join(", ")}; `
                + `Using Node Version ${latestversion._nodeVersion} and NPM Version ${latestversion._npmVersion}; `
                + `NPM Package: https://www.npmjs.com/package/${dat._id} ; Homepage: ${dat.homepage?.replace(/#\w+$/gi, "")}`;

            j_.message.reply(resp);
        });
    }
};