function _combineArr(){
    if(arguments.length > 0){
        return Array.prototype.concat(...arguments);
    } else {
        return null;
    }
};

module.exports = _combineArr;