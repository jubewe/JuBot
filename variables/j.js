const { ChatClient } = require("@kararty/dank-twitch-irc");
const uptime = require("../functions/uptime");
const mainpath = require("../functions/_mainpath");

let env = () => {return require("dotenv").config().parsed};
let e = () => {return process.env};
let config = () => {return require("../config.json")};

let j = {
    variables: () => {return require("./varstatic")},
    functions: () => {return require("../functions/_")},
    commands: () => {return require("../commands/_")},
    paths: () => {return require("./paths")},
    env: env,
    e: e,
    c: config,
    join: require("../functions/join"),
    send: () => {},
    client: new ChatClient({
        username: env().T_USERNAME,
        password: env().T_TOKEN,
        rateLimits: env().T_RATELIMITS
    }),
    message: {
        message: null,
        userstate: null,
        channel: null,
        server: null,

        _: {
            msg: null,
            user: null,
            chan: null,
            command: null
        },
    },

    script: {
        uptime: () => {return uptime()}
    },


};

module.exports = j;