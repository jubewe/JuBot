const fs = require("fs");
const commands = require("./commands/twitch/_");

let send_commands = [];

for(let command in commands){
    let command_ = commands[command];
    if(!command_.arguments){
        send_commands.push(command);
    } else {
        for(let argument in command_.arguments){
            let argument_ = command_.arguments[argument];
            if(argument_.options && argument_.options.length === 0){
                send_commands.push(`${command} ${argument_.name}`);
            } else {
                for(let option in argument_.options){
                    let option_ = argument_.options[option];
                    send_commands.push(`${command} <${option_}>`);
                }
            }
        }
    }
};

fs.writeFileSync("./monkaScommands.json", JSON.stringify({"commands":send_commands}));

console.log(send_commands);