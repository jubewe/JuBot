const _cache = require("./_cache");
const request = require("request");
const urls = require("../variables/urls");
const _regex = require("./_regex");
const _appf = require("./_appf");
const paths = require("../variables/paths");
const _stackname = require("./_stackname");
const j = require("../variables/j");

class seventv {
    static getchannel = async (j_, channelid) => {
        return new Promise((resolve, reject) => {
            if (!channelid) return reject({ path: [opt, 0], msg: "channelid is undefined" });

            request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), { method: "GET" }, (e, r) => {
                if (e) {
                    return reject(e);
                } else {
                    if (_regex.jsonreg().test(r.body)) {
                        let dat = JSON.parse(r.body);
                        _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))
                            .then(e => {
                                return resolve(e);
                            })
                            .catch(e => {
                                console.error(e);
                                return reject(e);
                            })
                    } else {
                        return reject(r.body);
                    }
                }
            });
        });
    };

    static getuserid = require("./seventv/getuser");

    static addemotediscord = async (j_, channelid, emoteids, discord_serverid) => {
        return new Promise((resolve, reject) => {
            if (!channelid) return reject({ path: [opt, 0], msg: "channelid is undefined" });
            if (!emoteids) return reject({ path: [opt, 1, 0], msg: "emoteids is undefined" });
            if (!discord_serverid) return reject({ path: [opt, 1, 1, 0], msg: "discord_serverid is undefined" });
            if (!Array.isArray(emoteids)) emoteids = [emoteids];

            let emotes = {
                "names": emoteids.filter(e => { return !_regex.seventv_emote_urlreg().test(e) }),
                "urls": emoteids.filter(e => { return _regex.seventv_emote_urlreg().test(e) })
            };

            request(urls.seventv.v2.channel.emotes.replace(":channel", channelid), { method: "GET" }, (e, r) => {
                if (e) {
                    return reject(e);
                } else {
                    if (_regex.arrayreg().test(r.body)) {
                        let dat = JSON.parse(r.body);
                        (async () => {
                            _cache(1, `${channelid}_seventv_emotes`, JSON.stringify(dat))

                            let emotenames = {};
                            Object.keys(dat).forEach(k => { emotenames[[...dat][k].name] = [...dat][k] })
                            let addemotes = {};
                            emotes.names.forEach(name => {
                                if (Object.keys(emotenames).includes(name)) {
                                    addemotes[name] = emotenames[name];
                                }
                            });

                            for (i = 0; i < emotes.urls.length; i++) {
                                let url = emotes.urls[i];
                                await new Promise((resolve2) => {
                                    request(urls.seventv.v2.emote.replace(":id", url.replace(_regex.seventv_emote_urlreg_2(), "")), { method: "GET" }, (e, r) => {
                                        if (e) { return resolve2(); } else {
                                            if (_regex.jsonreg().test(r.body)) {
                                                let dat = JSON.parse(r.body);
                                                addemotes[dat.name] = dat;
                                            }
                                            return resolve2();
                                        }
                                    });
                                })
                            };

                            // console.log(addemotes);

                            let addemotes2 = {
                                "resolve": {},
                                "reject": {}
                            };

                            for (let addemote in addemotes) {
                                await new Promise((resolve2) => {
                                    (async () => {
                                        await new Promise((resolve3) => {
                                            addemotes[addemote].urls2 = [addemotes[addemote].urls[2][1]];
                                            request(addemotes[addemote].urls[3][1].replace(".webp", ".gif"), (e, r) => {
                                                if (e) {
                                                    return resolve3();
                                                } else {
                                                    let emotebuffer = Buffer.from(r.body);
                                                    if (emotebuffer.byteLength !== 21854) {
                                                        let emoteurlnum = 3;
                                                        if (emotebuffer.byteLength > 33554432) {
                                                            emoteurlnum = 0;
                                                        }
                                                        addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif")];
                                                        // addemotes[addemote].urls2 = [addemotes[addemote].urls[emoteurlnum][1].replace(".webp", ".gif"), emotebuffer];
                                                    }
                                                    return resolve3();
                                                }
                                            });
                                        })
                                            .then(() => {
                                                // console.log(addemotes)
                                                if (!j.dc.client) return reject();
                                                j.dc.client.guilds.fetch(discord_serverid)
                                                    .then(guild => {
                                                        // (addemotes[addemote].urls2[1] ? addemotes[addemote].urls2[1].toString() : addemotes[addemote].urls2[0]), 
                                                        guild.emojis.create(
                                                            addemotes[addemote].urls2[0],
                                                            addemotes[addemote].name.replace(new RegExp(`[^\\w]`, "g"), ""),
                                                            { reason: `Add via chat command by ${j_.message.userstate.username}` }
                                                        )
                                                            .then(em => {
                                                                addemotes2.resolve[addemotes[addemote].name] = em;
                                                                _appf(paths.seventvlog, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "seventv", "add")} ${channelid} ${discord_serverid} ${addemotes[addemote].name} ${em.id} animated:${em.animated}`)
                                                                return resolve2(em);
                                                            })
                                                            .catch(e => {
                                                                addemotes2.reject[addemotes[addemote].name] = e;
                                                                return resolve2(e);
                                                            })
                                                    })
                                                    .catch(e => {
                                                        addemotes2.reject[addemotes[addemote].name] = e;
                                                        return resolve2(e);
                                                    })
                                            })
                                    })();
                                })
                            }

                            return resolve(addemotes2);
                        })();
                    } else {
                        return reject(r.body);
                    }
                }
            });

        });
    };

    static addemote = async (j_, channel7tvid, emote7tvid) => {
        return new Promise((resolve, reject) => {
            request(urls.seventv.gql, {
                headers: {
                    "authorization": `Bearer ${j.env().SEVENTV_TOKEN}`,
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "operationName": "ChangeEmoteInSet", "variables": { "action": "ADD", "id": channel7tvid, "emote_id": emote7tvid }, "query": "mutation ChangeEmoteInSet($id: ObjectID!, $action: ListItemAction!, $emote_id: ObjectID!, $name: String) {\n  emoteSet(id: $id) {\n    id\n    emotes(id: $emote_id, action: $action, name: $name) {\n      id\n      name\n      __typename\n    }\n    __typename\n  }\n}" })
            }, (e, r) => {
                if (e) return reject(Error({ "cause": e }));

                let dat = JSON.parse(r.body);

                return resolve(dat);
            });
        });
    };

    static removeemote = async (j_, channel7tvid, emote7tvid) => {
        return new Promise((resolve, reject) => {
            request(urls.seventv.gql, {
                headers: {
                    "authorization": `Bearer ${j.env().SEVENTV_TOKEN}`,
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "operationName": "ChangeEmoteInSet", "variables": { "action": "REMOVE", "id": channel7tvid, "emote_id": emote7tvid, "name": null }, "query": "mutation ChangeEmoteInSet($id: ObjectID!, $action: ListItemAction!, $emote_id: ObjectID!, $name: String) {\n  emoteSet(id: $id) {\n    id\n    emotes(id: $emote_id, action: $action, name: $name) {\n      id\n      name\n      __typename\n    }\n    __typename\n  }\n}" })
            }, (e, r) => {
                if (e) return reject(Error("", { "cause": e }));

                let dat = JSON.parse(r.body);

                return resolve(dat);
            });
        });
    };

    static searchemote = async (j_, emotename) => {
        return new Promise((resolve, reject) => {
            request(`${urls.seventv.gql}`, {
                headers: {
                    "authorization": `Bearer ${j.env().SEVENTV_TOKEN}`,
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({ "operationName": "SearchEmotes", "variables": { "query": emotename, "limit": 30, "page": 1, "sort": { "value": "popularity", "order": "DESCENDING" }, "filter": { "category": "TOP", "exact_match": false, "case_sensitive": false, "ignore_tags": false, "zero_width": false, "animated": false, "aspect_ratio": "" } }, "query": "query SearchEmotes($query: String!, $page: Int, $sort: Sort, $limit: Int, $filter: EmoteSearchFilter) {\n  emotes(query: $query, page: $page, sort: $sort, limit: $limit, filter: $filter) {\n    count\n    items {\n      id\n      name\n      state\n      trending\n      owner {\n        id\n        username\n        display_name\n        style {\n          color\n          paint_id\n          __typename\n        }\n        __typename\n      }\n      flags\n      host {\n        url\n        files {\n          name\n          format\n          width\n          height\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}" })
            }, (e, r) => {
                if (e) return reject(Error("", { "cause": e }));

                let dat = JSON.parse(r.body);
                return resolve(dat);
            });
        });
    };
};

module.exports = seventv;