function _getcurrentlocation(){
    try {
        throw new Error("getcurrentlocation");
    } catch(e){
        return String(e.stack.split("\n")[2].split(" ").reverse()[0].replace(/(^\(|\)$)/gi, ""));
    }
};

module.exports = _getcurrentlocation;