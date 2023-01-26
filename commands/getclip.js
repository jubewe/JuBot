const _cleantime = require("../functions/_cleantime");
const _pixelize = require("../functions/_pixelize");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _returnplural = require("../functions/_returnplural");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");

module.exports = {
    name: "getclip",
    id: "global_commands_getclip",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 1000,
    cooldown_user: 2000,
    arguments: [{name:"clip",required:true,options:["clipurl"]}],
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let clips = _splitafter(j_.message._.msg, 1).replace(_regex.t_clip_urlreg(), "").split(" ");

            j.functions().twitch.getclips(clips)
            .then(cl => {
                if(cl.length > 0){
                    let clipinfos = cl.map(cl2 => {
                        return `#${(cl.length > 1 ? `${clips.indexOf(cl2.id)+1}: ` : "")} Titled "${cl2.title}" was created ${_cleantime(Date.now()-new Date(cl2.created_at).getTime(), 4).time.join(" and ")} `
                        +`ago by ${_pixelize(cl2.creator_name)} (${cl2.creator_id}) in ${_pixelize(cl2.broadcaster_name)} (${cl2.broadcaster_id}) `
                        +`[Views: ${cl2.view_count}, Duration: ${_cleantime(cl2.duration*1000, 4, 1).time.join(" ")}, `
                        +`Language: ${cl2.language && cl2.language.length > 0 ? cl2.language : "<none>"}, `
                        +`Game-ID: ${cl2.game_id && cl2.game_id.length > 0 ? cl2.game_id : "<none>"}, `
                        +`Video-ID: ${cl2.video_id && cl2.video_id.length > 0 ? cl2.video_id : "<none>"}, `
                        +`VOD-Offset: ${cl2.vod_offset ?? "<none>"}] `
                        +`${cl2.url}, `
                    });
                    clipinfos.sort((a, b) => {return (parseInt(a.startsWith("#") ? a.split(" ")[0].split("#")[1] : 1) - parseInt(b.startsWith("#") ? b.split(" ")[0].split("#")[1] : 0))})

                    j_.send(`Clipinfo for ${cl.length} ${(cl.length < clips.length ? `(of ${clips.length}) ` : "")}clip${_returnplural(clips)}: ${clipinfos.join("\n")}`, undefined, true);
                } else {
                    j_.send(`Error: Could not recieve clip${_returnplural(clips)} (Invalid IDs)`);
                }
            })
            .catch(e => {
                console.error(e);
                j_.send(`Error: Could not get clip${_returnplural(clips)}: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
            })
        } else {
            j_.send(`Error: No clip(s) given`);
        }
    }
}