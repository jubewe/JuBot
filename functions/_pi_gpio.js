/**
 * 
 * @param {string} option set,get
 * @param {number | string} pin 1 or 1,2
 * @param {string} type op,ip
 * @param {string} value dh,dl
 */

function _pi_gpio(option, pin, type, value){
    try {
        require("child_process").execSync(`raspi-gpio ${option} ${pin} ${type} ${value}`);
    } catch(e){
        console.error(new Error(e));
    }
};

module.exports = _pi_gpio;