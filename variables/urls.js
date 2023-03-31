const getip = require("../functions/api/getip");

let urls = {
    "_files": "/mnt/MSD128_NAS/files/upload",
    "api": {
        "_base": "http://192.168.2.170",
        "_basepc": "http://192.168.2.103",
        // "_base": "http://127.0.0.0",
        // "_base": "http://127.0.0.1",
        "_port": 6969,
        "_endpoints": {
            "GET": {
                "valorantrank": "/valorantrank/:riotid/:tagline",
                "serverinfo": "/status",
                "errors": "/errors",
            },
            "POST": {
                "upload": "/upload",
                "error": "/error",
                "pcpower": "/pcpower"
            },
            "ALL": {
                "_main": "/"
            },
            "PATCH": {
                "errors": "/errors"
            }
        },
        __url: (endpoint, method) => {
            if(method){
                return `http://${getip("pi")}:${urls.api._port}${urls.api._endpoints[method][endpoint]}`;
            } 
            Object.keys(urls.api._endpoints).forEach(epm => {
                Object.keys(urls.api._endpoints[epm]).forEach(ep => {
                    if(ep === endpoint){
                        return urls.api._endpoints[epm][ep];
                    }
                })
            })
            return null;
        }
    },
    "modlookup": {
        "_base": "https://modlookup-api.jubewe.de"
    },
    "riotgames": {
        "_base": {
            "europe": "https://europe.api.riotgames.com",
            "america": "https://americas.api.riotgames.com"
        },
        "account_v1": {
            url: "/riot/account/v1/accounts/by-riot-id/{gameName}/{tagLine}",
            url_: (gameName, tagLine) => {return `/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`},
        }
    },
    "seventv": {
        "v2": {
            "user": "https://api.7tv.app/v2/users/:user",
            "channel": {
                "emotes": "https://api.7tv.app/v2/users/:channel/emotes"
            },
            "emote": "https://api.7tv.app/v2/emotes/:id"
        },
        "v3": {
            "channel": {
                "emotes": "https://7tv.io/v3/users/twitch/:channel"
            },
        },
        "gql": "https://7tv.io/v3/gql",
        "events": {
            "_base": "wss://events.7tv.io/v3"
        }
    },
    "ws": {
        "_port":6970
    },
    "twitch": {
        "moderator": {
            "add": {
                "url": "https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=:broadcaster_id&user_id=:user_id",
                "method": "POST"
            },
            "remove": {
                "url": "https://api.twitch.tv/helix/moderation/moderators?broadcaster_id=:broadcaster_id&user_id=:user_id",
                "method": "DELETE"
            }
        },
        "vip": {
            "add": {
                "url": "https://api.twitch.tv/helix/channels/vips?broadcaster_id=:broadcaster_id&user_id=:user_id",
                "method": "POST"
            },
            "remove": {
                "url": "https://api.twitch.tv/helix/channels/vips?broadcaster_id=:broadcaster_id&user_id=:user_id",
                "method": "DELETE"
            },
        },
        "channels": {
            "get": "https://api.twitch.tv/helix/channels"
        },
        "streams": "https://api.twitch.tv/helix/streams",
        "chatters": "https://tmi.twitch.tv/group/user/${channel}/chatters",
        "moderation": {
            "ban": {
                "url": "https://api.twitch.tv/helix/moderation/bans",
                "method": "POST"
            },
            "timeout": {
                "url": "https://api.twitch.tv/helix/moderation/bans",
                "method": "POST"
            },
            "unban": {
                "url": "https://api.twitch.tv/helix/moderation/bans",
                "method": "DELETE"
            },
            "untimeout": {
                "url": "https://api.twitch.tv/helix/moderation/bans",
                "method": "DELETE"
            },
            "delete": {
                "url": "https://api.twitch.tv/helix/moderation/chat",
                "method": "DELETE"
            }
        },
        "clip": {
            "create": {
                "url": "https://api.twitch.tv/helix/clips",
                "method": "POST"
            },
            "get": {
                "url": "https://api.twitch.tv/helix/clips",
                "method": "GET"
            }
        },
        "video": {
            "get": {
                "url": "https://api.twitch.tv/helix/videos",
                "method": "GET"
            }
        },
        "poll": {
            "create": {
                "url": "https://api.twitch.tv/helix/polls",
                "method": "POST"
            }
        },
        "announcement": {
            "url": "https://api.twitch.tv/helix/chat/announcements",
            "method": "POST"
        },
        "chat_settings": {
            "update": {
                "url": "https://api.twitch.tv/helix/chat/settings",
                "method": "PATCH"
            },
            "get": {
                "url": "https://api.twitch.tv/helix/chat/settings",
                "method": "GET"
            }
        },
        "whisper": "https://api.twitch.tv/helix/whispers"
    },
    "youtube": {
        "search": {
            "raw": "https://www.googleapis.com/youtube/v3/search",
            // https://developers.google.com/youtube/v3/docs/search/list
            "channels": {
                "get": "https://www.googleapis.com/youtube/v3/search?q=${q}&type=channel&key=${env.YT_APIKEY}",
                "get2": "https://www.googleapis.com/youtube/v3/search${channelid}&type=channel&key=${env.YT_APIKEY}"
            },
            "videos": {
                "get": "https://www.googleapis.com/youtube/v3/search?q=${q}&type=video&channelid=${channelid}&key=${env.YT_APIKEY}",
                "get2": "https://www.googleapis.com/youtube/v3/search${channelid}&type=video&key=${env.YT_APIKEY}"
            }
        },
        "channels": {
            "list": {
                "raw": "https://developers.google.com/youtube/v3/docs/channels/list"
            }
        }
    },
    "paauulli": {
        "_base": "https://api.paauulli.me",
        "bot": {
            "bots": "/bot/bots"
        }
    },
    "twitchbots_info": {
        "_base": "https://api.twitchbots.info/v2",
        "bot": "/bot"
    },
    "3v": {
        "modlookup": {
            "_base": "https://modlookup.3v.fi/api",
            "user-v3": "/user-v3/:user",
            "user-totals": "/user-totals/:user",
            "top": "/top",
            "stats": "/stats"
        }
    },
    "openai": {
        "completions": {
            "completions": "https://api.openai.com/v1/completions"
        }
    }
};

module.exports = urls;