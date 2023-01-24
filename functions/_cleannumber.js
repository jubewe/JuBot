/**
 * @param {Number} num 
 * @param {Number} numopt 
 * @param {Number} numdigits 
 * @param {Boolean} numspacer Numbers get splitted by 3 digits (1000 -> 1.000) 
 * @param {String} insertnumname Gets inserted between the number and the number name
 * @param {Boolean} firstcap Makes the first letter of the number name capital
 * @param {String} numspacerreplacer
 * @param {Number} decimals
 * @returns {String | Number}
 */

const _numberspacer = require("./_numberspacer");

function _cleannumber(num, numopt, numdigits, numspacer, insertnumname, firstcap, numspacerreplacer, decimals){
    let num_ = num.toString();
    numopt = (numopt ?? 1);
    numdigits = (numdigits ?? 4);
    numspacer = (numspacer ?? false);
    insertnumname = (insertnumname ?? " ");
    firstcap = (firstcap ?? true);
    decimals = (decimals ?? 1);

    if(num_.length <= numdigits) return (numspacer ? _numberspacer(num) : num);

    const numnames = {
        "3": ["thousand", "k"], 
        "6": ["million", "m"], 
        "9": ["billion", "g"], 
        "12": ["trillion", "t"],
        "15": ["quadrillion", "p"]
    };

    let numlog = parseInt(Math.log10(num).toFixed(0));
    let numnamenum = Object.keys(numnames).filter(val => {
        let val_ = parseInt(val);
        return ([val_, val_+1, val_+2].includes(numlog));
    });
    if(numnamenum.length === 0) numnamenum = Object.keys(numnames).reverse()[0]; else numnamenum = numnamenum[0];
    let numname = numnames[numnamenum];

    let decimals_ = num_.substring(num_.length-parseInt(numnamenum));
    if(decimals_.length > 0) decimals_ = Math.round(parseInt(decimals_.substring(0, decimals_.length-1) + "." + decimals_.substring(decimals_.length-1))).toString();
    if(/$0+^/g.test(decimals_)) decimals_ = "";
    
    return `${(numspacer ? _numberspacer(num_.substring(0, num_.length-parseInt(numnamenum)), numspacerreplacer) : 
        num_.substring(0, num_.length-parseInt(numnamenum)))}${(decimals_.length > 0 ? "." + decimals_+ " " : "")}${insertnumname}${(firstcap ? ((numname[numopt] || numname[0])).split("")[0].toUpperCase() + 
        ((numname[numopt] || numname[0])).substring(1) : (numname[numopt] || numname[0]))}`;
};

module.exports = _cleannumber;