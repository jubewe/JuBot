/**
 * @param {number} min
 * @param {number} max
 * @param {number} add gets added to the randomized number
 * @returns {number} random picked number
 */

function _randomnum(min, max, add) {
  min = parseInt(min ?? 0);
  max = parseInt(max ?? 10);
  add = parseInt(add ?? 1);
  this.s = [min, max].sort((a, b) => {
    return (a - b);
  });
  return add + s[0] + Math.floor(Math.random() * (this.s[1] - this.s[0]));
};

module.exports = _randomnum;