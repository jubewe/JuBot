/**
 * 
 * @param {string} queryname 
 * @param {array | null | undefined} queryparams
 * @param {boolean} firstquery
 * @returns {string}
 */

function _joinurlquery(queryname, queryparams, firstquery){
    if(!queryparams){
        queryparams = [...arguments];
        queryparams.shift();
    } else {
        if(!Array.isArray(queryparams)){
            queryparams = [queryparams];
        }
    }

    return `${(firstquery ? "?" : "&")}${queryname}=${queryparams.join(`&${queryname}=`)}`;
};

module.exports = _joinurlquery;