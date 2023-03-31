let files = require("../../variables/files");
let paths = require("../../variables/paths");
const { nonarr } = require("../../variables/varstatic");
const _appf = require("../_appf");
const _id = require("./_id");
const _nonarr = require("../_nonarr");
const _stackname = require("../_stackname");

/**
 * @param {number} opt 
 * @param {object} j_ 
 * @param {boolean | null} noreturn 
 * @param {number | null} channelid 
 * @param {string | null} intervalid 
 * @param {string} intervalname 
 * @param {string} intervalresponse 
 * @param {0 | 1} intervalstate 
 * @param {number} intervaltime 
 * @returns {promise}
 */

async function custominterval(opt, j_, noreturn, channelid, intervalid, intervalname, intervalresponse, intervalstate, intervaltime) {
    return new Promise((resolve, reject) => {
        if (nonarr.includes(opt)) return reject({ path: [0], msg: "opt is undefined" });
        channelid = (channelid ?? j_.message.channel.id);
        intervalaliases = (intervalaliases ?? []);
        intervalstate = (intervalstate ?? 1);
        intervaltime = (intervaltime ?? (60 * 60 * 1000))
        intervalid = intervalid?.toLowerCase();
        intervalname = intervalname?.toLowerCase();

        switch (opt) {
            case 0: {
                if (!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
                if (!files.channels.channels[channelid].intervals) files.channels.channels[channelid].intervals = {};

                if (!intervalid) return resolve(files.channels.channels[channelid].intervals);
                if (!intervalname) {
                    if (files.channels.channels[channelid].intervals[intervalid]) return resolve(files.channels.channels[channelid].intervals[intervalid]);
                    return reject({ path: [opt, 1, 1, 1, 0], msg: "interval not found by id" });
                };

                if (!getintervalidbyname()) return reject({ path: [opt, 1, 1, 1, 0], msg: "interval not found by name" });

                return resolve(files.channels.channels[channelid].intervals[getintervalidbyname()])
                break;
            };

            case 1: {
                if (!intervalname) return reject({ path: [opt, 0], msg: "intervalname is undefined" });
                if (!intervalresponse) return reject({ path: [opt, 1, 0], msg: "intervalresponse is undefined" });
                _id(1, "channel", channelid, "interval")
                    .then(id => {
                        let interval = {
                            name: intervalname,
                            id: id[0],
                            state: intervalstate,
                            add_user: j_.message.userstate.id,
                            create_time: Date.now(),
                            update_time: Date.now(),
                            time: intervaltime,
                            response: intervalresponse
                        };
                        if (!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
                        if (!files.channels.channels[channelid].intervals) files.channels.channels[channelid].intervals = {};

                        files.channels.channels[channelid].intervals[id[0]] = interval;
                        _appf(paths.intervallog, `\n${Date.now()} ${_stackname(0, "intervals", "add")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)}`);
                        _appf(paths.log, `\n${Date.now()} ${_stackname(0, "intervals", "add")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)}`);

                        return resolve(interval);
                    })
                    .catch(e => {
                        console.error(e);
                        return reject({ path: [opt, 1, 1, 0], msg: "could not create id" });
                    })
                break;
            };

            case 2: {
                if (!intervalid && !getintervalidbyname()) return reject({ path: [opt, 0], msg: "could not find interval" });
                intervalid = (intervalid ?? getintervalidbyname());
                if (!files.channels.channels[channelid]) return reject({ path: [opt, 1], msg: "channels do not include channelid" });
                if (!files.channels.channels[channelid].intervals) return reject({ path: [opt, 1, 0], msg: "keys of channel do not include intervals" });
                if (!files.channels.channels[channelid].intervals[intervalid]) return reject({ path: [opt, 1, 1, 0], msg: "intervals of channel do not include intervalid" });

                let interval = files.channels.channels[channelid].intervals[intervalid];
                delete files.channels.channels[channelid].intervals[intervalid];
                _appf(paths.intervallog, `\n${Date.now()} ${_stackname(0, "intervals", "delete")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "intervals", "delete")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)}`);

                return resolve(interval);

                break;
            };

            case 3: {
                if (!intervalid && !getintervalidbyname()) return reject({ path: [opt, 0], msg: "could not find interval" });

                if (!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
                if (!files.channels.channels[channelid].intervals) files.channels.channels[channelid].intervals = {};
                intervalid = intervalid || getintervalidbyname();
                if (!files.channels.channels[channelid].intervals[intervalid]) return reject({ path: [opt, 0], msg: "intervals of channel do not include interval" });

                let interval_ = files.channels.channels[channelid].intervals[intervalid];
                let interval = {
                    name: _nonarr(intervalname, interval_.name),
                    id: interval_.id,
                    state: _nonarr(intervalstate, interval_.state),
                    add_user: interval_.add_user,
                    create_time: interval_.create_time,
                    update_time: Date.now(),
                    time: (intervaltime ?? interval_.time),
                    response: _nonarr(intervalresponse, interval_.response)
                };

                files.channels.channels[channelid]["intervals"][intervalid] = interval;
                _appf(paths.intervallog, `\n${Date.now()} ${_stackname(0, "intervals", "edit")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)} ${JSON.stringify(interval_)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "intervals", "edit")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)} ${JSON.stringify(interval_)}`);

                return resolve(interval);
                break;
            };

            case 4: {
                if (!intervalid && !getintervalidbyname()) return reject({ path: [opt, 0], msg: "could not find interval" });
                if (!intervalresponse) return reject({ path: [opt, 1, 0], msg: "new intervalname is undefined" });

                if (!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
                if (!files.channels.channels[channelid].intervals) files.channels.channels[channelid].intervals = {};
                intervalid = (intervalid || getintervalidbyname());
                if (getintervalidbyname(intervalresponse)) return reject({ path: [opt, 1, 1, 0], msg: "interval already exists" });
                if (files.config.intervals.custom.restricted.includes(intervalresponse)) return reject({ path: [opt, 1, 1, 1, 0], msg: "restrictedinterval" });

                if (!files.channels.channels[channelid].intervals[intervalid]) return reject({ path: [opt, 0], msg: "intervals of channel do not include interval" });
                let interval = files.channels.channels[channelid]["intervals"][intervalid];
                let interval_ = interval;
                interval.name = intervalresponse;
                _appf(paths.intervallog, `\n${Date.now()} ${_stackname(0, "intervals", "rename")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval_)} ${JSON.stringify(interval)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "intervals", "rename")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval_)} ${JSON.stringify(interval)}`);

                return resolve(files.channels.channels[channelid].intervals[intervalid]);
                break;
            };

            case 5: {
                if (!intervalid && !getintervalidbyname()) return reject({ path: [opt, 0], msg: "could not find interval" });
                if (!files.channels.channels[channelid]) files.channels.channels[channelid] = {};
                if (!files.channels.channels[channelid].intervals) files.channels.channels[channelid].intervals = {};
                intervalid = (intervalid || getintervalidbyname());
                if (!files.channels.channels[channelid].intervals[intervalid]) return reject({ path: [opt, 0], msg: "intervals of channel do not include interval" });

                let interval_ = files.channels.channels[channelid].intervals[intervalid];

                let interval = {
                    ...interval_,
                    update_time: Date.now(),
                    time: (intervaltime ?? interval_.time)
                }

                files.channels.channels[channelid].intervals[intervalid] = interval;
                _appf(paths.intervallog, `\n${Date.now()} ${_stackname(0, "intervals", "edit", "cooldown")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)} ${JSON.stringify(interval_)}`);
                _appf(paths.log, `\n${Date.now()} ${_stackname(0, "intervals", "edit", "cooldown")[0]} ${channelid} ${interval.id} ${interval.name} ${JSON.stringify(interval)} ${JSON.stringify(interval_)}`);

                return resolve(interval);
                break;
            };
        };

        function getintervalidbyname(name) {
            name = (name || intervalname);
            let ret = undefined;
            if (!files.channels.channels[channelid] || !files.channels.channels[channelid].intervals) return ret;
            Object.keys(files.channels.channels[channelid].intervals).map(cmdid => {
                if (files.channels.channels[channelid].intervals[cmdid].name === name) ret = cmdid;
            });
            return ret;
        };
    });
};

module.exports = custominterval;