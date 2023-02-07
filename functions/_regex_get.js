const files = require("../variables/files");

let regexes_array = files.regexes.regexes;
let err = "";

function _regex_get(){
    let regexes = {"_all":[],"_default":[],"default":{},"_ignored":[]};
    let currentgroup;

    regexes_array.forEach((a_, i) => {
        let a = `${a_}`;
        if(/^\/{2}/g.test(a)) return;
        if(/::+\w+/g.test(a)){
            a = a.split("::")[1];
            if(a.split(":")[1]){
                currentgroup = a.split(":");
                regexes[currentgroup[0]][currentgroup[1]] = [];
            } else {
                currentgroup = [a];
                regexes[currentgroup] = [];
            }
            return;
        };
        a = a.replace(/\\!/g, "[\\W_]*?");
        if(a.startsWith("::-")){
            regexes._ignored.push(new RegExp(a.split("::-")[1]));
            return;
        };
        try {
            let areg = new RegExp(a);
            if(currentgroup[0] == "default"){
                regexes._default.push(areg);
            }
            regexes._all.push(areg);
            regexes[currentgroup[0]][currentgroup[1]].push(areg);
        } catch(e) {
            try {
                new RegExp(a_);
                err += `\n${i}\traw: false\t${a_}`;
            } catch(e){
                err += `\n${i}\traw:true\t${a_}`;
            }
        }
    });

    return {
        "regexes": regexes,
        "regexes_array": regexes_array,
        "_err": err
    };
};

module.exports = _regex_get;