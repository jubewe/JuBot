const _regex_get = require("./_regex_get");

const regexes = _regex_get();
/**
 * @param {string} str 
 * @returns {null | Array<string>}
*/
async function _regex_filter(opt, str, replacer, groups){
    if(!(str ?? undefined)) return null;

    // console.error(err);
    if(!groups) groups = ["_default"];

    let regexes_all_string = new RegExp(`${`(${Object.keys(regexes.regexes).map(a => {
        if(groups.includes(a)){
            return `(${regexes.regexes[a].map(b => {return b.source}).join("|")})`
        }
    }).filter(a => {return a!==undefined}).join("|")})`}`);

    switch (opt){
        case 0:
        default: {
            return regexes_all_string.test(str);
        }

        case 1: {
            return str.replace(regexes_all_string, replacer ?? "<Blocked word>");
        }
    };
};

module.exports = _regex_filter;