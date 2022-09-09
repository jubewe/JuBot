/**
 * 
 * @param {number} returneropt 
 * @param {any} returnera 
 * @param {any} returnerb 
 * @param {any} returnertrue 
 * @param {any} returnerfalse 
 * @returns {any} returnertrue | returnerfalse
 */

function _returner(returneropt, returnera, returnerb, returnertrue, returnerfalse){
    // returneropt: 0: ===, 1: !==, 2: return returnera, 3: return returnerb
    if(returneropt === 0){
        return (returnera === returnerb ? returnertrue : returnerfalse)
    } else if(returneropt === 1){
        return (returnera !== returnerb ? returnertrue : returnerfalse)
    } else if(returneropt === 2){
        return (returnera === returnerb ? returnera : returnertrue)
    } else if(returneropt === 3){
        return (returnera !== returnerb ? returnera : returnertrue)
    } else if(returneropt === 4){
        if(returnerb.includes(returnera)){
            return returnertrue
        } else {
            return returnerfalse
        }
    } else if(returneropt === 5){
        if(!returnerb.includes(returnera)){
            return returnertrue
        } else {
            return returnerfalse
        }
    }
};

module.exports = _returner;