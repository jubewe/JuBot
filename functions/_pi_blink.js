const _pi_gpio = require("./_pi_gpio");
const c = require("../config.json");

let state = 0;

function _pi_blink(opt){
    state = opt || state;
    console.log(`\t\t\t\tGPIO set ${state}`)
    _pi_gpio("set", c.raspi.led_pin, "op", ["dh","dl"][state]);
    state = [1,0][state];
};

module.exports = _pi_blink;