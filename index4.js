const fs = require("fs");
const _cleantime = require("./functions/_cleantime");
const files = require("./variables/files");

let commands = JSON.parse(fs.readFileSync("./commands.json", "utf-8"));

// let commands = {commands:[]};
// let added = 0;
// fs.readdirSync("./commands").forEach(cmd => {
//     if(cmd.match(/(_template)/g)) return;
//     if(!cmd.match(/(\w+\.+\w+$|_template)/g)){
//         fs.readdirSync(`./commands/${cmd}`).forEach(a => {
//             addcmd(a, `./commands/${cmd}`)
//         });
//     } else {
//         addcmd(cmd, "./commands");
//     }
// });

// async function addcmd(cmd, path){
//     added++;
//     console.log(`Addcmd #${added} ${cmd} \t ${path}`);
//     if(!cmd.match(/((_)\.js|_template)/g)){
//         console.log(`Addcmd2 #${added} ${cmd} \t ${path}`);
//         let cmd2 = require(`${path}/${cmd}`);
//         commands.commands.push({
//             name: cmd.replace(/\.+\w+$/g, ""),
//             name2: `${path.replace("./commands", "").split(".").join("_")}_${cmd.replace(/\.\w+$/g, "")}`.replace(/^(_|\/)/g, ""),
//             internal_name: cmd2.name,
//             arguments: cmd2.parameters || [],
//             permission: cmd2.permission,
//             cooldown: cmd2.cooldown,
//             cooldown_user: cmd2.cooldown_user,
//             description: cmd2.description || ""
//         });
//         return;
//     } else {
//         return;
//     }
// };

// fs.writeFileSync("./commands.json", JSON.stringify(commands));
let commands_ = "Format: **commandname** (**required permission**, **cooldown**, **user cooldown**) **description**";
let commands_formatted = commands_;
let permissions = files.permissions;
// let commands_formatted_sorted = [commands_];
let commands_formatted_sorted = commands.commands.sort((a, b) => {return (a.permission - b.permission)});

// commands.commands.forEach(cmd => {
commands_formatted_sorted.forEach(cmd => {
    commands_ += `\n${cmd.name} (${permissions.permissions[cmd.permission].desc}, ${(cmd.cooldown > 0 ? _cleantime(cmd.cooldown, 5, 1).time.join(" ") : "None")} ${(cmd.cooldown_user > 0 ? _cleantime(cmd.cooldown_user, 5, 1).time.join(" ") : "None")}) ${(cmd.description.length > 0 ? cmd.description : "None")}`;
    commands_formatted += `\n>+ **${cmd.name}** (${permissions.permissions[cmd.permission].desc}, ${(cmd.cooldown > 0 ? _cleantime(cmd.cooldown, 5, 1).time.join(" ") : "None")} ${(cmd.cooldown_user > 0 ? _cleantime(cmd.cooldown_user, 5, 1).time.join(" ") : "None")}) ${(cmd.description.length > 0 ? cmd.description : "None")}`;
    // commands_formatted_sorted.push([cmd.name, cmd.permission, permissions.permissions[cmd.permission].desc, (cmd.cooldown > 0 ? _cleantime(cmd.cooldown, 5, 1).time.join(" ") : "None"), (cmd.cooldown_user > 0 ? _cleantime(cmd.cooldown_user, 5, 1).time.join(" ") : "None"), (cmd.description.length > 0 ? cmd.description : "None")])
});


console.log(commands_);

// fs.writeFileSync("./commands.txt", commands_, "utf-8");