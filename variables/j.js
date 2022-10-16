const { ChatClient } = require("@kararty/dank-twitch-irc");
const uptime = require("../functions/uptime");
const _mainpath = require("../functions/_mainpath");
const express = require("express");
const app = express();
const ws = require("ws");
// const { Gpio } = require("onoff")

let env = () => {
  return require("dotenv").config({path: _mainpath("./.env")}).parsed;
};
let e = () => {
  return process.env;
};
let config = () => {
  return require("../config.json");
};

let client = new ChatClient({
  username: env().T_USERNAME,
  password: env().T_TOKEN,
  rateLimits: env().T_RATELIMITS,
});

// let seventv_ws = new ws.WebSocket("")

let j = {
  variables: () => {
    return require("./varstatic");
  },
  vars: () => {
    return require("./vars");
  },
  urls: () => {
    return require("./urls")
  },
  functions: () => {
    return require("../functions/_");
  },
  commands: () => {
    return require("../commands/_");
  },
  dm_commands: () => {
    return require("../commands/_dm")
  },
  paths: () => {
    return require("./paths");
  },
  env: env,
  e: e,
  c: config,
  send: require("../functions/send"),
  join: require("../functions/join"),
  part: require("../functions/part"),
  lasterror: {},
  
  client: client,
  client_: () => {return client},
  
  viewclient: new ChatClient({
    username: env().T_USERNAME_PV,
    password: env().T_TOKEN_PV,
    rateLimits: env().T_RATELIMITS_PV,
  }),
  message: {
    message: null,
    userstate: null,
    channel: null,
    server: null,

    _: {
      args: require("../functions/twitch/messageargs"),
      msg: null,
      user: null,
      chan: null,
      command: null,
      userperm: {
        num: null,
        desc: "",
        tag: null || "",
      },
      userperms: {},
      type: 0,
    },
  },

  script: {
    uptime: () => {
      return uptime();
    },
  },
  express: {
    app: app,
  },
  _error: require("../functions/_error"),
  modules: {
    "request": require("request"),
    
  },
  // seventv: {
  //   ws: new ws.WebSocket("wss://events.7tv.io/v3")
  // }
};

j.client.on("")

module.exports = j;