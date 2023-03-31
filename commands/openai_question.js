const _returnerr = require("../functions/_returnerr");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");
const openai = require("../functions/openai");
const c_j_ = require("../classes/twitch/j_");

module.exports = {
    name: "openai_question",
    id: "global_commands_openai_question",
    aliases: [],
    state: 1,
    add_version: "0.2.0",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    arguments: [{name:"question",required:true,options:[]}],
    /**
     * @param {c_j_} j_ 
     */
    exec: async (j_) => {
        if(!j_.message._.args()[0]) return j_.send("No question given");

        let question = _splitafter(j_.message._.msg, 1);

        j_.send(`ChatGPT is thinking... (this can take up to a minute) 🕑`);

        openai.completion.completion(null, question)
        .then((answer) => {
            j_.send(answer.choices[0].text.split("\n").slice(2).join("; "), undefined, true);
        })
        .catch(e => {
            console.error(e);
            j_.send(`Error: Could not get answer on question: ${_returnerr(e,0)}`);
        })
    }
};