const { ChatClient } = require("@kararty/dank-twitch-irc");
const { Client, Intents, MessageAttachment, MessageEmbed } = require("discordjs13.11.0");
const uptime = require("../functions/twitch/uptime");
const _mainpath = require("../functions/_mainpath");
const express = require("express");
const ws = require("ws");
const urls = require("./urls");

let env = () => {
  return require("dotenv").config({path: _mainpath("./.env")}).parsed;
};
let e = () => {
  return process.env;
};
let config = () => {
  return require("../config.json");
};

// let seventv_ws = new ws.WebSocket("")

let j = {
  variables: () => {return require("./varstatic");},
  vars: () => {return require("./vars");},
  urls: () => {return require("./urls")},
  files: () => {return require("./files");},
  functions: () => {return require("../functions/_");},
  functions_: require("../functions/__"),
  commands: () => {return require("../commands/twitch/_");},
  dm_commands: () => {return require("../commands/dm/_");},
  anna_dm_commands: () => {return require("../commands/anna/_");},
  paths: () => {return require("./paths");},
  env: env,
  e: e,
  c: () => {return require("../config.json")},
  send: require("../functions/twitch/actions/send"),
  join: require("../functions/twitch/actions/join"),
  part: require("../functions/twitch/actions/part"),
  lasterror: {},
  
  client: undefined,
  //  >> String

  ws: {
    client: undefined
  },
  dc: {
    // client: undefined
    client: new Client({
      intents: new Intents(32767)
    })
  },
  viewclient: undefined,
  script: {
    uptime: () => {
      return uptime();
    },
  },
  express: {
    app: undefined,
  },
  _error: () => {},
  modules: {
    "request": require("request"),
    "ws": require("ws"),
    "discord": { MessageAttachment, MessageEmbed, Client, Intents }
  },
};

j._error = require("../functions/_error")

if(config().connect.discord){
  j.dc.client = new Client({
    intents: new Intents(32767)
  });
};

if(config().connect.ws.api){
  j.ws.client = new ws.WebSocket(`ws://${urls.api._base.replace("http://", "")}:${urls.ws._port}`);
};

if(config().connect.twitch){
  j.client = new ChatClient({
    username: env().T_USERNAME,
    password: env().T_TOKEN,
    rateLimits: env().T_RATELIMITS,
  });
};

if(config().connect.twitch_view){
  j.viewclient =  new ChatClient({
    username: env().T_USERNAME_PV,
    password: env().T_TOKEN_PV,
    rateLimits: env().T_RATELIMITS_PV,
  });
};

if(config().connect.express.app){
  j.express.app = express();
};

if(config().connect.ws.seventv){
  j.seventv = j.seventv ?? {};
  j.seventv.ws = new ws.WebSocket("wss://events.7tv.io/v3")
};

global.j = j;
module.exports = j;