/**
 * @param {array} obj 
 */

function _removeduplicates(obj){
    if(!obj) return null;
    this.obj2 = [];
    obj.forEach(a => {if(!this.obj2.includes(a)) this.obj2.push(a)});
    return this.obj2;
    // of as
    
};

module.exports = _removeduplicates;