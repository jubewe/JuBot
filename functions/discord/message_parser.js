const { Message } = require("discordjs13.11.0");

/**
 * @param {Message} response
 * @returns 
 */

function message_parser(response) {
  class userstate {
    static username = response.author.tag;
    static displayname = response.author.username;
    static color = (response.member ? (response.member.displayHexColor ?? null) : null);
    static color2 = (response.member ? (response.member.displayHexColor ?? null) : null);
    static ismod = response.member.permissions.has("MODERATE_MEMBERS", true);
    static firstmsg = false;
    static subscriber = false;
    static mod = (response.member.permissions.has("MODERATE_MEMBERS", true) ? 1 : 0);
    static turbo = 0;
    static usertype = (response.author.bot ? "bot" : (response.author.system ? "system": "default"));
    static messageId = response.id;
    static id = response.author.id;
    static badges = "";
    static badges2 = [];
    static badgesinfo = "";
    static flags = response.flags;
    static flagsRaw = response.flags;
  }

  class message {
    static messageText = response.content;
    static isAction = false;
    static isCheer = false;
    static bits = 0;
    static bitsraw = "0";
    static type = response.type;
    static emotes = response.components;
    static emotesRaw = response.emotesRaw;
    static firstmsg = false;
    static id = response.id;
    static timestamp = response.createdAt;
    static timestampRaw = response.createdAt;
    static isreply = response.hasThread;
    static replyUserName = (response.thread ? response.thread.ownerId : null);
    static replyUserID = (response.thread ? response.thread.ownerId : null);
    static replyMessage = (response.thread ? response.thread.lastMessage.content : null);
    static replyMessageID = (response.thread ? response.thread.lastMessage.id : null);
    static replyUserNameRaw = (response.thread ? response.thread.ownerId : null);
    static emotecount = 0;
    static emotesarr = [];
    static emotearremotes = [];
    static emotesraw = "";
  }

  class channel {
    static name = response.channel.name;
    static nameraw = response.channel.name.toLowerCase();
    static id = response.channel.id;
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

module.exports = message_parser;