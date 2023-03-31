const path = require("path");

/** @param {string} path_ */
function _mainpath(path_){
    if(!path_ || path_.length === 0){
        return path.resolve(path.dirname(__dirname), "./");
    } else {
        return path.resolve(path.dirname(__dirname), path_);
    }
};

module.exports = _mainpath;