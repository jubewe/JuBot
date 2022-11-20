let j = require("../variables/j");

module.exports = () => {
    if(j.c().handlers.filechange){
        require("./filechange")();

        setInterval(require("./filechange"), j.c().intervals.handlers.filechange);
    }
    
};