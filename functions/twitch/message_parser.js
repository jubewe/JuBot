
/**
 * 
 * @param {privmsg} response 
 * @returns 
 */

function privmsg_parser(response) {
  function emoterawnames() {
    let emoteraws = [];
    for (i = 0; i < response.emotes.length; i++) {
      emoteraws.push(response.emotes[i].code);
    }
    return emoteraws;
  }

  function getreply() {
    return [
      response.ircTags["reply-parent-display-name"],
      response.ircTags["reply-parent-user-id"],
      response.ircTags["reply-parent-msg-body"],
      response.ircTags["reply-parent-msg-id"],
      response.ircTags["reply-parent-user-login"],
    ];
  }

  class userstate {
    static username = response.senderUsername;
    static displayname = response.displayName;
    static color = response.colorRaw;
    static color2 = response.color;
    static ismod = response.isMod;
    static firstmsg = response.ircTags["first-msg"];
    static subscriber = response.ircTags["subscriber"];
    static mod = response.isModRaw;
    static turbo = response.ircTags["turbo"];
    static usertype = response.ircTags["user-type"];
    static messageId = response.messageID;
    static id = response.ircTags["user-id"];
    static badges = response.badgesRaw;
    static badges2 = response.badges;
    static badgesinfo = response.ircTags["badges-info"];
    static flags = response.flags;
    static flagsRaw = response.flagsRaw;
  }

  class message {
    static messageText = response.messageText;
    static isAction = response.isAction;
    static isCheer = response.isCheer();
    static bits = response.bits;
    static bitsraw = response.bitsRaw;
    static type = response.ircCommand;
    static emotes = response.emotes;
    static emotesRaw = response.emotesRaw;
    static firstmsg = response.ircTags["first-msg"];
    static id = response.messageID;
    static timestamp = response.serverTimestamp;
    static timestampRaw = response.serverTimestampRaw;
    static isreply = (response.ircTags["reply-parent-msg-id"] !== null ? true : false);
    static replyUserName = getreply()[0];
    static replyUserID = getreply()[1];
    static replyMessage = getreply()[2];
    static replyMessageID = getreply()[3];
    static replyUserNameRaw = getreply()[4];
    static emotecount = response.emotes.length;
    static emotesarr = response.emotes;
    static emotearremotes = emoterawnames();
    static emotesraw = response.emotesRaw;
  }

  class channel {
    static name = response.channelName;
    static nameraw = response.ircParameters[0];
    static id = response.channelID;
  }

  class server {
    static timestamp = response.serverTimestamp;
    static timestampRaw = response.serverTimestampRaw;
    static rawSource = response.rawSource;
    static ircPrefixRaw = response.ircPrefixRaw;
    static ircParameters = response.ircParameters;
    static ircPrefixnickname = response.ircPrefix["nickname"];
    static ircPrefixusername = response.ircPrefix["username"];
    static ircPrefixhostname = response.ircPrefix["hostname"];
  }

  return {
    message: message,
    userstate: userstate,
    channel: channel,
    server: server,
    response: response,
  };
}

module.exports = privmsg_parser;
