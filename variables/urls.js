let urls = {
    "_files": "/mnt/MSD128_NAS/files/upload",
    "api": {
        "_base": "http://192.168.2.170",
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
            },
            "ALL": {
                "_main": "/"
            }
        },
        __url: (endpoint, method) => {
            if(method){
                return `${urls.api._base}:${urls.api._port}${urls.api._endpoints[method][endpoint]}`;
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
    "seventv": {
        "v2": {
            "channel": {
                "emotes": "https://api.7tv.app/v2/users/${channel}/emotes"
            }
        },
        "v3": {
            "channel": {
                "emotes": "https://7tv.io/v3/users/twitch/${channel}"
            }
        },
        "events": {
            "_base": "wss://events.7tv.io/v3"
        }
    },
    "ws": {
        "_port":6970
    }
    
};

module.exports = urls;