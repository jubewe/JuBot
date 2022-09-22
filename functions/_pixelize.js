function _pixelize(pinput, piindex, ppixel){
    if(pinput !== undefined){
      let pindex = 3;
      let pixler = "󠀀";
      if(piindex !== undefined){
        pindex = piindex;
      }
      if(ppixel !== undefined){
        pixler = ppixel;
      }
      return `${pinput.substring(0, pindex)}${pixler}${pinput.substring(pindex, pinput.split("").length)}`;
    } else {
      return `err-pi1`;
    }
};

module.exports = _pixelize;