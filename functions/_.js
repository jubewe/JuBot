module.exports = {
  _afk: require("./_afk"),
  _appf: require("./_appf"),
  _channel: require("./twitch/_channel"),

  _checkenv: require("./_checkenv"),
  _checkmultiplevalinobj: require("./_checkmultiplevalinobj"),
  _checkvalinobj: require("./_checkvalinobj"),
  _chunkArr: require("./_chunkArray"),
  _cleantime: require("./_cleantime"),
  _combineArr: require("./_combineArr"),
  _converttime: require("./_converttime"),
  _cooldown: require("./twitch/_cooldown"),
  _decoder: require("../modules/express/functions/_decoder"),
  _error: require("./_error"),
  _getallobjectkeystree: require("./_getallobjectkeystree"),
  _getbyobjectkeyfromtree: require("./_getbyobjectkeyfromtree"),
  _encoder: require("../modules/express/functions/_encoder"),

  _id: require("./twitch/_id"),
  _joinurlquery: require("./_joinurlquery"),
  _log: require("./_log"),
  _mainpath: require("./_mainpath"),
  _percentage: require("./_percentage"),
  _pi_blink: require("./_pi_blink"),
  _pi_gpio: require("./_pi_gpio"),
  _pickrandom: require("./_pickrandom"),
  _pixelize: require("./_pixelize"),
  _randomnum: require("./_randomnum"),
  _removeduplicates: require("./_removeduplictes"),
  _returnerr: require("./_returnerr"),
  _returnplural: require("./_returnplural"),
  _rf: require("./_rf"),
  _sleep: require("./_sleep"),
  _splitafter: require("./_splitafter"),
  _splitmsg: require("./_splitmsg"),
  _stackname: require("./_stackname"),
  _staticspacer: require("./_staticspacer"),
  _wf: require("./_wf"),
  _cache: require("./_cache"),
  _nonarr: require("./_nonarr"),
  _numberspacer: require("./_numberspacer"),

  _regex: require("./_regex"),

  badgestoarr: require("./twitch/_badgestoarr"),
  checktoken: require("./twitch/gettoken"),
  privmsg_parser: require("./twitch/privmsg_parser"),
  remind: require("./twitch/remind"),
  replacevariables: require("./discord/replacevariables"),
  whisper_parser: require("./twitch/whisper_parser"),
  revoketoken: require("./twitch/revoketoken"),
  getuser: require("./twitch/getuser"),
  getuserbyid: require("./twitch/getuserbyid"),
  getuserid: require("./twitch/getuserid"),
  getuserperm: require("./twitch/getuserperm"),
  token: require("./twitch/token"),
  uptime: require("./twitch/uptime"),
  userperms: require("./twitch/userperms"),

  twitch: require("./twitch/_actions"),
  
  api: {
    api_requestheaders: require("./api/api_requestheaders"),
    
  },

  discord: {
    messageembed: require("./discord/messageembed"),

  }
};
