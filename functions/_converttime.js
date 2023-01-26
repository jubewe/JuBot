/**
 *  
 * @param {string} time 
 * @param {boolean} treturn
 * @returns to ms converted time
 */

const _regex = require("./_regex");

let multiplicatortoms = {
    "ms":1,
    "s":1000,
    "sek":1000,
    "m":1000*60,
    "min":1000*60,
    "h":1000*60*60,
    "hour":1000*60*60,
    "d":1000*60*60*24,
    "day":1000*60*60*24,
};

function _converttime(time, treturn){
    if(!time) return null;
    time = time.toLowerCase();
    if(_regex.timereg1().test(time)){
        if(!Object.keys(multiplicatortoms).includes(time.split(new RegExp(`[\\d]+`))[1])){
            if(!treturn){
                return -0;
            }
            return null;
        }

        return time.split(new RegExp(`[a-z]+`))[0] * multiplicatortoms[time.split(new RegExp(`[\\d]+`))[1]];
    }

    if(!isNaN(new Date(time))){
        return new Date(time).getTime()-Date.now();
    }
};

module.exports = _converttime;