/**
 * 
 * @param {number} num 
 * @returns {string} Split number
 */

function _numberspacer(num, replacer){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, replacer || " ");
};

module.exports = _numberspacer;