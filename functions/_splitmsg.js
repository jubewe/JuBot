// /**
//  * 
//  * @param {string} string 
//  * @param {RegExp | string} splitter 
//  * @param {number} length 
//  * @param {number} threshold 
//  */

 function _splitmsg(splitstr, splitsp, splitnum, splitbuffer, splitbufferstart){
    if(typeof splitstr === "string"){
        if(typeof splitsp !== "undefined"){
            if(typeof splitnum === "number" && typeof splitbuffer === "number" && typeof splitbufferstart === "number"){
                let splitted = [];
                let splitnumi = ((splitstr.length/splitnum).toString().split(".")[0] !== undefined ? parseInt((splitstr.length/splitnum).toString().split(".")[0])+1 : parseInt((splitstr.length/splitnum).toString()));
                if(splitnumi > 0){
                    let splitstra = splitstr;
                    for(let i = 0; i < splitnumi+1; i++){
                        if(splitstra.length > 0){
                            let splitstrb = splitstra.substring(0, splitnum);
                            if(splitstrb.split(splitsp).reverse()[0].split(splitsp).length > 0 && i !== splitnumi){
                                let splitremove = splitstrb.split(splitsp).reverse()[0].length - splitbuffer - splitbufferstart;
                                splitstrb = splitstrb.substring(0, splitnum - (splitremove + splitbuffer + splitsp.length));
                                splitstra = splitstra.substring(splitstrb.length + splitbufferstart, splitstra.length);
                            } else {
                                splitstrb = splitstra;
                            }
                            splitted.push(splitstrb);
                        } else {
                            i = splitnumi;
                        }
                    }
                } else {
                    splitted.push(splitstr);
                }
                return splitted;
            } else {
                return 3;
            }
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}; 

/* function _splitmsg(splitstr, splitsp, splitnum, splitbuffer, splitbufferstart){
    if(typeof splitstr === "string"){
        if(typeof splitsp !== "undefined"){
            if(typeof splitnum === "number" && typeof splitbuffer === "number" && typeof splitbufferstart === "number"){
                let splitted = [];
                let splitnumi = ((splitstr.length/splitnum).toString().split(".")[0] !== undefined ? parseInt((splitstr.length/splitnum).toString().split(".")[0])+1 : parseInt((splitstr.length/splitnum).toString()));
                if(splitnumi > 0){
                    let splitstra = splitstr;
                    for(let i = 0; i < splitnumi+1; i++){
                        if(splitstra.length > 0){
                            let splitstrb = splitstra.substring(0, splitnum);
                            if(splitstrb.split(splitsp).reverse()[0].split(splitsp).length > 0 && i !== splitnumi){
                                let splitremove = splitstrb.split(splitsp).reverse()[0].length - splitbuffer - splitbufferstart;
                                splitstrb = splitstrb.substring(0, splitnum - (splitremove + splitbuffer + splitsp.length));
                                splitstra = splitstra.substring(splitstrb.length + splitbufferstart, splitstra.length);
                            } else {
                                splitstrb = splitstra;
                            }
                            splitted.push(splitstrb);
                        } else {
                            i = splitnumi;
                        }
                    }
                } else {
                    splitted.push(splitstr);
                }
                return splitted;
            } else {
                return 3;
            }
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}; */

/*
function _splitmsg(string, splitter, length, threshold){
    splitter = splitter || "\\s";
    length = length || 500;
    threshold = threshold || 10;
    // string = string.replace(new RegExp(`\\\\`, "g"), `\\\\\\\\`)
    let splits = string.match(new RegExp(`(.{1,${length-threshold}})`, "gi"));
    // ((?<=$${splitter})|${splitter}))+
    // ((?=^${splitter})|${splitter}))+
    // {${length-threshold},${length}}
    console.log(splits);
    return null;
}; */

module.exports = _splitmsg;