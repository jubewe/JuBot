module.exports = {
  _afk: require("./_afk"),
  _appf: require("./_appf"),
  _channel: require("./_channel"),

  _checkenv: require("./_checkenv"),
  _checkmultiplevalinobj: require("./_checkmultiplevalinobj"),
  _checkvalinobj: require("./_checkvalinobj"),
  _chunkArr: require("./_chunkArray"),
  _cleantime: require("./_cleantime"),
  _combineArr: require("./_combineArr"),
  _converttime: require("./_converttime"),
  _cooldown: require("./_cooldown"),
  _decoder: require("../express/functions/_decoder"),
  _error: require("./_error"),
  _encoder: require("../express/functions/_encoder"),

  _id: require("./_id"),
  _joinurlquery: require("./_joinurlquery"),
  _log: require("./_log"),
  _mainpath: require("./_mainpath"),
  _percentage: require("./_percentage"),
  _pi_blink: require("./_pi_blink"),
  _pi_gpio: require("./_pi_gpio"),
  _pickrandom: require("./_pickrandom"),
  _pixelize: require("./_pixelize"),
  _randomnum: require("./_randomnum"),
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
  _channel: require("./_channel"),
  _nonarr: require("./_nonarr"),
  _numberspacer: require("./_numberspacer"),

  _regex: require("./_regex"),

  badgestoarr: require("./badgestoarr"),
  checktoken: require("./gettoken"),
  privmsg_parser: require("./privmsg_parser"),
  remind: require("./remind"),
  replacevariables: require("./replacevariables"),
  whisper_parser: require("./whisper_parser"),
  revoketoken: require("./revoketoken"),
  getuser: require("./getuser"),
  getuserbyid: require("./getuserbyid"),
  getuserid: require("./getuserid"),
  getuserperm: require("./getuserperm"),
  token: require("./token"),
  uptime: require("./uptime"),
  userperms: require("./userperms"),

  twitch: require("./twitch/_actions"),
  
  api: {
    api_requestheaders: require("./api/api_requestheaders"),
    
  },

  discord: {
    messageembed: require("./discord/messageembed"),

  }
};
