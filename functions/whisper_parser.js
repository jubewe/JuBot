const { WhisperMessage } = require("@kararty/dank-twitch-irc");

/**
 * 
 * @param {WhisperMessage} response 
 * @returns 
 */

function whisper_parser(response) {
  function emoterawnames() {
    let emoteraws = [];
    for (i = 0; i < response.emotes.length; i++) {
      emoteraws.push(response.emotes[i].code);
    }
    return emoteraws;
  }

  class userstate {
    static username = response.senderUsername;
    static displayname = response.displayName;
    static color = response.colorRaw;
    static color2 = response.color;
    static turbo = response.ircTags["turbo"];
    static usertype = response.ircTags["user-type"];
    static messageId = response.messageID;
    static id = response.ircTags["user-id"];
    static badges = response.badgesRaw;
    static badges2 = response.badges;
  }

  class message {
    static messageText = response.messageText;
    static type = response.ircCommand;
    static emotes = response.emotes;
    static emotesRaw = response.emotesRaw;
    static id = response.messageID;
    static thread_id = response.threadID;
    static timestamp = response.serverTimestamp;
    static timestampRaw = response.serverTimestampRaw;
    static emotecount = response.emotes.length;
    static emotesarr = response.emotes;
    static emotearremotes = emoterawnames();
    static emotesraw = response.emotesRaw;
  }

  class channel {
    static name = response.recipientUsername;
    static id = parseInt(response.threadID.split("_")[1]);
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
  };
}

module.exports = whisper_parser;
