const _cleantime = require("../functions/_cleantime");
const _pixelize = require("../functions/_pixelize");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _returnplural = require("../functions/_returnplural");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");

module.exports = {
    name: "getvideo",
    id: "global_commands_getvideo",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 1000,
    cooldown_user: 2000,
    arguments: [{name:"videoid/url",required:true,options:[]}],
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let videos = _splitafter(j_.message._.msg, 1).replace(_regex.t_video_urlreg(), "").split(" ");

            j.functions().twitch.getvideos(videos)
            .then(vid => {
                if(vid.length > 0){
                    let videoinfos = vid.map(vid2 => {
                        // ${["streamed", "highlighted", "uploaded"][["archive", "highlight", "upload"].indexOf(vid2.type)]}
                        return `#${(vid.length > 1 ? `${videos.indexOf(vid2.id)+1}: ` : "")} Titled "${vid2.title}" was created ${_cleantime(Date.now()-new Date(vid2.created_at).getTime(), 4).time.join(" and ")} ago `
                        +`in ${_pixelize(vid2.user_name)} (${vid2.user_id}) [Views: ${vid2.view_count}, Duration: ${vid2.duration}, `
                        +`Language: ${vid2.language && vid2.language.length > 0 ? vid2.language : "<none>"}, Viewable: ${vid2.viewable}, `
                        +`Description: ${vid2.description && vid2.description.length > 0 ? vid2.description : "<none>"}] ${vid2.url}`
                    });
                    videoinfos.sort((a, b) => {return (parseInt(a.startsWith("#") ? a.split(" ")[0].split("#")[1] : 1) - parseInt(b.startsWith("#") ? b.split(" ")[0].split("#")[1] : 0))})

                    j_.send(2, `Videoinfo for ${vid.length} ${(vid.length < videos.length ? `(of ${videos.length}) ` : "")}video${_returnplural(videos)}: ${videoinfos.join("\n")}`, undefined, true);
                } else {
                    j_.send(`Error: Could not recieve video${_returnplural(videos)} (Invalid IDs)`);
                }
            })
            .catch(e => {
                j_.send(`Error: Could not get video${_returnplural(videos)}: ${_returnerr(e)}`);
            })
        } else {
            j_.send(`Error: No Video(s) specified`);
        }
    }
};