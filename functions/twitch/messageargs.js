let j = require("../../variables/j");

module.exports = () => {
    j = require("../../variables/j");
    let msg_ = j.message._.msg.split(" ");
    if(msg_.length > 1){
        msg_.shift();
        return msg_;
    }
    return [];
};