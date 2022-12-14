const { ChatClient } = require("@kararty/dank-twitch-irc");
const { Client, Intents, MessageAttachment, MessageEmbed } = require("discordjs13.11.0");
const { REST } = require("@discordjs/rest");
// import { Routes } from "discordjs13.11.0/node_modules/discord-api-types/v9";
const { Routes } = require("discordjs13.11.0/node_modules/discord-api-types/v9");
const uptime = require("../functions/twitch/uptime");
const _mainpath = require("../functions/_mainpath");
const express = require("express");
const urls = require("./urls");
const { WebSocket, WebSocketServer } = require("ws");

let env = () => {
  return require("dotenv").config({path: _mainpath("./.env")}).parsed;
};
let e = () => {
  return process.env;
};
let config = () => {
  return require("../config.json");
};

let ws_server_config = () => {
  return require("../modules/ws/server/config.json");
};

// let seventv_ws = new ws.WebSocket("")

let j_WebSocket = require("../classes/ws/j_WebSocket");

class j {
  static variables = () => {return require("./varstatic");};
  static vars = () => {return require("./vars");};
  static urls = () => {return require("./urls")};
  static files = () => {return require("./files");};
  static functions = () => {return require("../functions/_");};
  static functions_ = require("../functions/__");
  static commands = () => {return require("../commands/twitch/_");};
  static dm_commands = () => {return require("../commands/dm/_");};
  static anna_dm_commands = () => {return require("../commands/anna/_");};
  static paths = () => {return require("./paths");};
  static env = env;
  static e = e;
  static c = () => {return require("../config.json")};
  static send = require("../functions/twitch/actions/send");
  static join = require("../functions/twitch/actions/join");
  static part = require("../functions/twitch/actions/part");
  static _error = require("../functions/_error");
  static lasterror = {};
  
  static client = ChatClient;
  static viewclient = ChatClient;

  static ws = {
    client: j_WebSocket,
    server: WebSocketServer,
    send: require("../functions/ws/send")
  };
  static dc = {
    client: Client,
    rest: REST,
    // rest: new REST({version: "9"}).setToken(env().DC_TOKEN)
  };
  static script = {
    uptime: () => {
      return uptime();
    },
  };
  static express = {
    app: express(),
  };
  static modules = {
    "request": require("request"),
    "ws": require("ws"),
    "discord": { MessageAttachment, MessageEmbed, Client, Intents },
    "discord-api-types": { Routes },
    "WebSocket": j_WebSocket,
    "j_WebSocket": j_WebSocket
  };
};

if(config().connect.discord){
  j.dc.client = new Client({
    intents: new Intents(32767)
  });
  j.dc.rest = new REST({version: "9"}).setToken(env().DC_TOKEN);
};

if(config().connect.ws.api){
  j.ws.client = new j_WebSocket(`ws://${urls.api._base.replace("http://", "")}:${urls.ws._port}`);
};

if(config().connect.ws.server){
  j.ws.server = new WebSocketServer({port: ws_server_config().port, backlog: 1, clientTracking: true});
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
  // j.seventv.ws = new ws.WebSocket("wss://events.7tv.io/v3")
};

global.j = j;
module.exports = j;