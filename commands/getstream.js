const _cleantime = require("../functions/_cleantime");
const _numberspacer = require("../functions/_numberspacer");
const _regex = require("../functions/_regex");
const _returnerr = require("../functions/_returnerr");
const _returnplural = require("../functions/_returnplural");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");

module.exports = {
    name: "getstream",
    id: "global_commands_getstream",
    aliases: [],
    state: 1,
    add_version: "0.1.7",
    add_user: "jubewe",
    permission: j.c().perm.moderator,
    cooldown: 1000,
    cooldown_user: 2000,
    exec: async (j_) => {
        if(j_.message._.args()[0]){
            let streams = _splitafter(j_.message._.msg, 1).replace(_regex.replacer(), "").split(" ");

            j.functions().twitch.getstreams(streams.filter(a => {return (_regex.numregex().test(a))}) || undefined, streams.filter(a => {return (_regex.usernamereg().test(a))}))
            .then(st => {
                if(st.length > 0){
                    let streaminfos = st.map(st2 => {
                        return `#${(st.length > 1 ? `${streams.indexOf(st2.id)+1}: ` : "")} ${st2.user_name} (${st2.user_id}) is streaming `
                        +`${st2.game_name && st2.game_name.length > 0 ? st2.game_name : "<none>"} (${st2.game_id ?? "<none>"})`
                        +`since ${_cleantime(Date.now()-new Date(st2.started_at).getTime(), 5).time.join(" and ")} to currently ${_numberspacer(st2.viewer_count)} viewers `
                        +`[Title: "${st2.title}", Language: ${st2.language && st2.language.length > 0 ? st2.language : "<none>"}, `
                        +`Stream-ID: ${st2.id}, Mature: ${st2.is_mature}, Type: ${st2.type}]`
                    });

                    j_.send(`Streaminfo for ${st.length} ${(st.length < streams.length ? `(of ${streams.length}) ` : "")}stream${_returnplural(streams)}: ${streaminfos.join("\n")}`, undefined, true);
                } else {
                    j_.send(`Error: Could not recieve stream${_returnplural(streams)} (Invalid Names/IDs or Offline)`);
                }
            })
            .catch(e => {
                console.error(e);
                j_.send(`Error: Could not recieve Streams: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
            })
        } else {
            j_.send(`Error: No channels given`);
        }
    }
};