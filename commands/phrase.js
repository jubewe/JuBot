const _pickrandom = require("../functions/_pickrandom");
const _regex = require("../functions/_regex");
const _wf = require("../functions/_wf");
let j = require("../variables/j");
const paths = require("../variables/paths");

module.exports = {
    name: "phrase",
    id: "global_commands_phrase",
    aliases: [],
    state: 1,
    add_version: "0.1.5",
    add_user: "jubewe",
    permission: j.c().perm.botdefault,
    cooldown: -1,
    cooldown_user: -1,
    exec: async (j_) => {
        switch (j_.message._.command) {
            case "phrase":
            case "randomphrase": {
                if(!j_.message._.args()[0]){
                    let phrase = _pickrandom(j.files().phrases.phrases, 1);
                    j_.send(`Random Phrase [${j.files().phrases.phrases.indexOf(phrase)}]: ${phrase}`);
                } else {
                    switch (j_.message._.args()[0]){
                        case "add": {
                            if(!j_.message._.args()[1]){
                                j_.send(`Error: No phrase to add given`);
                                return;
                            }

                            if(j.files().phrases.phrases.includes(j_.message._.args()[1])){
                                j_.send(`Error: phrase already added`);
                                return;
                            }

                            let phrase = j_.message._.msg.substring(j_.message._.prefix.length + j_.message._.command.length+1+j_.message._.args()[0].length+1);
                            j.files().phrases.phrases.push(phrase);
                            _wf(paths.phrases, j.files().phrases);

                            j_.send(`Successfully added phrase ${phrase}`);
                            break;
                        }

                        case "delete":
                        case "remove": {
                            if(!j_.message._.args()[1]){
                                j_.send(`Error: No phrase to remove given`);
                                return;
                            }
                            
                            let phrase = j_.message._.msg.substring(j_.message._.prefix.length + j_.message._.command.length+1+j_.message._.args()[0].length+1);

                            if(_regex.numregex().test(phrase)){
                                if(j.files().phrases.phrases[parseInt(phrase)]){
                                    let phrase_ = j.files().phrases.phrases[parseInt(phrase)];
                                    j.files().phrases.phrases.splice(parseInt(phrase), 1);
                                    _wf(paths.phrases, j.files().phrases);

                                    j_.send(`Successfully deleted phrase [${phrase}]: ${phrase_}`)
                                } else {
                                    j_.send(`Error: Phrase not found (by id)`);
                                }
                            } else {
                                if(j.files().phrases.phrases.includes(phrase)){
                                    let phrase_ = j.files().phrases.phrases.indexOf(phrase);
                                    j.files().phrases.phrases.splice(phrase_, 1);
                                    _wf(paths.phrases, j.files().phrases);

                                    j_.send(`Successfully deleted phrase [${phrase_}]: ${phrase}`);
                                } else {
                                    j_.send(`Error: Phrase not found (by content)`);
                                }
                            }
                            break;
                        }

                        case "list": {
                            j_.send(`Phrases [${j.files().phrases.phrases.length}]: <in work>`)
                            break;
                        }
                        
                    }
                }

                break;
            }
        }
        
    }
}