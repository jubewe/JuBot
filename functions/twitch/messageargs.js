module.exports = (j_, j) => {
    let msg_ = j_.message._.msg.split(" ");
    if(msg_.length > 1){
        msg_.shift();
        return msg_;
    }
    return [];
};