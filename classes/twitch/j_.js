const privmsgMessage = require("oberknecht-client/lib/parser/PRIVMSG.Message");

class j_ {
    message = class extends privmsgMessage {
        _ = class {
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
    };

    send = (sendopt, sendmessage, sendmulti, sendreplacer) => {};
};

module.exports = j_;