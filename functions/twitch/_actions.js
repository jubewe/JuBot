module.exports = {
    // send: require("./actions/send"),
    join: require("./actions/join"),
    part: require("./actions/part"),

    ban: require("./actions/ban"),
    unban: require("./actions/unban"),
    timeout: require("./actions/timeout"),
    untimeout: require("./actions/unban"),

    announce: require("./actions/announce"),
    updatechatsettings: require("./actions/updatechatsettings"),

    createclip: require("./actions/createclip"),
    
    getclips: require("./actions/getclips"),
    getvideos: require("./actions/getvideos"),
    getstreams: require("./actions/getstreams"),

    _parametercheck: require("./_parametercheck"),
    _badgestoarr: require("./_badgestoarr"),

    createpoll: require("./actions/createpoll"),

    deletemessage: require("./actions/deletemessage"),

    _reconnect: require("./actions/_reconnect"),

}