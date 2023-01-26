const { TwitchEmote } = require("@kararty/dank-twitch-irc");

class j_ {
    static message = class {
        static _ = class {
            static opts = class {
                static modified_channel = Object() || undefined;
                static noafk = Boolean();
                static noreminder = Boolean();
            };

            static matches = class {
                static chan = Array() || null;
                static user = Array() || null;
                static sendopt = Array() || null;
                static noafk = Array() || null;
                static noreminder = Array() || null;
            };
            static msg = String();
            static user = String();
            static chan = String();
            static _type = String();
            static usertag = String();
            static usertag_ = String();
            static userperm = class {
                static num = Number();
                static desc = String();
                static name = null || String();
            };
            static userperms = class {
                static _bot = Boolean();
                static moderator = Boolean();
                static moderator_ = Boolean();
                static broadcaster = Boolean();
                static broadcaster_ = Boolean();
                static _default = Boolean();
                static _high = Boolean();
                static _owner = Boolean();
            };
            static args = () => {return []};
        };
        static message = class message {
            static messageText = String();
            static isAction = Boolean();
            static isCheer = Boolean();
            static bits = Number();
            static bitsraw = String();
            static type = String();
            static emotes = TwitchEmote;
            static emotesRaw = String();
            static firstmsg = String();
            static id = String();
            static timestamp = Date();
            static timestampRaw = Number();
            static isreply = Boolean();
            static replyUserName = String() || undefined;
            static replyUserID = String() || undefined;
            static replyMessage = String() || undefined;
            static replyMessageID = String() || undefined;
            static replyUserNameRaw = String() || undefined;
            static emotecount = Number();
            static emotesarr = TwitchEmote;
            static emotearremotes = Array();
            static emotesraw = String();
        };

        static userstate = class userstate {
            static username = String();
            static displayname = String();
            static color = String();
            static color2 = String();
            static ismod = Boolean();
            static firstmsg = Boolean();
            static subscriber = Boolean();
            static mod = "1" || "0";
            static turbo = "1" || "0";
            static usertype = String();
            static messageId = String();
            static id = Number();
            static badges = String();
            static badges2 = Array();
            static badgesinfo = String();
            static flags = new Map();
            static flagsRaw = String();
        };

        static channel = class channel {
            static name = String();
            static nameraw = String();
            static id = String();
        };
        
        static server = class server {
            static timestamp = Date();
            static timestampRaw = Number();
            static rawSource = String();
            static ircPrefixRaw = String() || undefined;
            static ircParameters = Array();
            static ircPrefixnickname = String() || undefined;
            static ircPrefixusername = String() || undefined;
            static ircPrefixhostname = String() || undefined;
        };
    };
};

module.exports = j_;