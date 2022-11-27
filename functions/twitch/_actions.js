module.exports = {
    send: require("./send"),
    join: require("./join"),
    part: require("./part"),

    ban: require("./ban"),
    unban: require("./unban"),
    timeout: require("./timeout"),
    untimeout: require("./unban"),

    createclip: require("./createclip"),
    
    getclips: require("./getclips"),
    getvideos: require("./getvideos"),
    getstreams: require("./getstreams"),

    _parametercheck: require("./_parametercheck"),
    _badgestoarr: require("./_badgestoarr"),

    createpoll: require("./createpoll"),

}