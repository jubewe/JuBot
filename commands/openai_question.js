const _returnerr = require("../functions/_returnerr");
const _splitafter = require("../functions/_splitafter");
let j = require("../variables/j");
const openai = require("../functions/openai");

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
    exec: async (j_) => {
        if(!j_.message._.args()[0]) return j_.send("No question given");

        let question = _splitafter(j_.message._.msg, 1);

        openai.completion.completion(null, question)
        .then((answer) => {
            console.log(answer.choices[0].text.split("\n").slice(2).join("; "));
            j_.send(answer.choices[0].text.split("\n").slice(2).join("; "));
            // j_.send("Oida");
        })
        .catch(e => {
            console.error(e);
            j_.send(`Error: Could not get answer on question: ${_returnerr(e,0)} ${_returnerr(e,1)}`);
        })
    }
};