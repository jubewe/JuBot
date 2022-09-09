const path = require("path");

/**
 * 
 * @param {string} path_ 
 * @returns {path} Path from the main dir
 */

function mainpath(path_){
    return path.resolve(path.dirname(__dirname), path_);
};

module.exports = mainpath;