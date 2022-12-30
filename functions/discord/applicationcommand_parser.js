const { Interaction } = require("discordjs13.11.0");

/**
 * @param {Interaction} response
 * @returns 
 */

function applicationcommand_parser(response) {
  class userstate {
    static username = response.user.tag;
    static displayname = response.user.username;
    static color = "";
    static color2 = "";
    static ismod = (response.memberPermissions ? response.memberPermissions.has("MODERATE_MEMBERS", true) : false);
    static firstmsg = false;
    static subscriber = false;
    static mod = (response.memberPermissions ? (response.memberPermissions.has("MODERATE_MEMBERS", true) ? 1 : 0) : 0);
    static turbo = 0;
    static usertype = (response.user.bot ? "bot" : (response.user.system ? "system": "default"));
    static messageId = response.id;
    static id = response.user.id;
    static badges = "";
    static badges2 = [];
    static badgesinfo = "";
    static flags = [];
    static flagsRaw = "";
  }

  class message {
    static messageText = `${response.commandName}${(response.options._hoistedOptions.length > 0 ? " " + response.options._hoistedOptions.map(a => {return a.value.replace(" ", "\s")}).join(" ") : "")}`;
    static isAction = false;
    static isCheer = false;
    static bits = 0;
    static bitsraw = "0";
    static type = response.type;
    static emotes = [];
    static emotesRaw = "";
    static firstmsg = false;
    static id = response.id;
    static timestamp = response.createdAt;
    static timestampRaw = response.createdAt;
    static isreply = "";
    static replyUserName = "";
    static replyUserID = "";
    static replyMessage = "";
    static replyMessageID = "";
    static replyUserNameRaw = "";
    static emotecount = 0;
    static emotesarr = [];
    static emotearremotes = [];
    static emotesraw = "";
  }

  class channel {
    static name = (response.channel ? response.channel.name : "");
    static nameraw = (response.channel ? response.channel.name.toLowerCase() : "");
    static id = response.channelId;
  }

  class server {
    static timestamp = response.createdAt;
    static timestampRaw = response.createdAt.getTime();
    static rawSource = response;
    static ircPrefixRaw = "";
    static ircParameters = [];
    static ircPrefixnickname = null;
    static ircPrefixusername = null;
    static ircPrefixhostname = null;
  }

  return {
    message: message,
    userstate: userstate,
    channel: channel,
    server: server,
    response: response,
  };
}

module.exports = applicationcommand_parser;