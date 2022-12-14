let j = require("./variables/j");

require("./_init")();
require("./handlers/_")();
require("./functions/other/getknownbots")();

j.client.on("PRIVMSG", require("./handlers/twitch/PRIVMSG"));
j.client.on("WHISPER", require("./handlers/twitch/WHISPER"));
j.client.on("USERNOTICE", require("./handlers/twitch/USERNOTICE"));