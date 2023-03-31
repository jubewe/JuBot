/**
 * @param {array} pickarray 
 * @param {number} pickcount
 * @returns {string} Option
 */

function _pickrandom(pickarray, pickcount){
    if(!pickcount || pickcount === 1){
        return pickarray[Math.floor(Math.random()*pickarray.length)];
    } else {
        let return_ = [];
        for(i = 0; i < pickcount; i++){
            return_.push(pickarray[Math.floor(Math.random()*pickarray.length)]);
        }
        return return_.join(" ");
    }
};

module.exports = _pickrandom;