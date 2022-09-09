let regex = {
    usernamereg: (unr) => {return new RegExp(`${(unr === 1 ? ".*" : "")}[\\w]${(unr === 1 ? ".*" : "")}`, "g")},
    nonusernamereg: (nunr) => {return new RegExp(`${(nunr === 1 ? ".*" : "")}[\\W]${(nunr === 1 ? ".*" : "")}`, "g")},
    numregex: (nur) => {return new RegExp(`[\\d]{${nur.length}}`, "g").test(nur)},
    nobotreg: new RegExp(`(\\-)+(((no|remove)+bot(s*))|((r|n)+b))`, "g"),
    ranknumreg: new RegExp(`(\\-)+[\\d]+`, "g")
};

module.exports = regex;