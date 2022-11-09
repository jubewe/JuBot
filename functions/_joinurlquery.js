/**
 * 
 * @param {string} queryname 
 * @param {array | null | undefined} queryparams
 * @returns {string}
 */

function _joinurlquery(queryname, queryparams){
    if(!queryparams){
        queryparams = [...arguments];
        queryparams.shift();
    }

    return `?${queryname}=${queryparams.join(`&${queryname}=`)}`;
};

module.exports = _joinurlquery;