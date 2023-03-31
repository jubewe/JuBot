let j = require("../../variables/j");

const getuserperm = require("../../functions/twitch/getuserperm");
const userperms_ = require("../../functions/twitch/userperms");
const _channel = require("../../functions/twitch/_channel");
const _cleantime = require("../../functions/_cleantime");
const _staticspacer = require("../../functions/_staticspacer");
const _log = require("../../functions/_log");
const commandhandler = require("./commandhandler");
const custom_commandhandler = require("./custom_commandhandler");
const custom_keywordhandler = require("./custom_keywordhandler");
const _combineArr = require("../../functions/_combineArr");
const remind = require("../../functions/twitch/remind");
const getuser = require("../../functions/twitch/getuser");
const _afk = require("../../functions/_afk");
const _regex = require("../../functions/_regex");
const commands = require("../../commands/twitch/_");
const _permission = require("../../functions/twitch/_permission");
const privmsgMessage = require("oberknecht-client/lib/parser/PRIVMSG.Message");
const files = require("../../variables/files");

/** @param {privmsgMessage} response */
module.exports = async (response) => {
  class j_ {
    static message = response;
  };
  j_.message._ = {};

  let msgopts = j_.message._.opts = {
    modified_channel: undefined,
    noafk: false,
    noreminder: false,
    help: false
  };

  let modified_channel = j_.message._.modified_channel = undefined;

  let msgmatches = j_.message._.matches = {
    chan: response.messageText.match(new RegExp(`(\-chan\:\\w+\\b|^${j.c().prefix}+\\b\\w+\\b\:+\\w+)`, "i")),
    user: response.messageText.match(new RegExp(`\-user\:[^\\s]+`, "i")),
    sendopt: response.messageText.match(new RegExp(`\-send\:[^\\s]+`, "i")),
    noafk: response.messageText.match(new RegExp(`\-(no)*afk`, "i")),
    noreminder: response.messageText.match(new RegExp(`\-(no)*reminder`, "i")),
    help: response.messageText.match(new RegExp(`\-(h|help)\\b`, "i")),
    ignorecooldown: response.messageText.match(new RegExp(`\-(i|c|cooldown)`, "i"))
  };

  if (j.c().modules.message._) {
    if (j.c().modules.message.modified_channel && (msgmatches.chan ?? msgmatches.user ?? msgmatches.sendopt)) {
      await getuserperm(response.senderUserID, response.badgesRaw.split(",")[0]?.split("/")[0])
        .then(async (uperm) => {
          if (!(uperm.num >= j.c().perm.botdefault)) return;

          if (msgmatches.chan !== null) {
            await new Promise((resolve) => {
              let msgchanmatch0 = new RegExp(`(\-chan\:|^${j.c().prefix}\\b\\w+\\b\:)`, "i");
              let msgchan = msgmatches.chan[0].split(msgmatches.chan[0].match(msgchanmatch0)[0])[1];

              let msgchanmatchreplace = new RegExp(`\-chan\:[^\\s]+`, "i")
              if (msgmatches.chan[0].match(new RegExp(`^${j.c().prefix}\\b\\w+\\b\:+\\w+`, "i"))) {
                msgchanmatchreplace = `:${msgchan}`;
              };

              getuser(1, msgchan)
                .then(u => {
                  if (response.channel.id !== u[1]) {
                    modified_channel = j_.message._.modified_channel = {
                      name: response.channel.name,
                      id: response.channel.id,
                    };
                    response.channel.name = u[0];
                    response.channel.id = u[1];
                  };

                  response.message.messageText = response.message.messageText.replace(msgchanmatchreplace, "");

                  msgopts.modified_channel = modified_channel;

                  return resolve();
                })
                .catch(() => {
                  return resolve();
                })
            })
          };

          if (msgmatches.user !== null) {
            await new Promise((resolve) => {
              let msguser = msgmatches.user[0].split(new RegExp(`\-user\:`))[1].toLowerCase();
              if (![j.e().T_USERNAME, j.e().T_USERNAME_PV].includes(msguser) && [j.e().T_USERNAME, j.e().T_USERNAME_PV].includes(response.userstate.username)) {
                getuser(1, msguser)
                  .then(u => {
                    j_.message._.modified_user = {
                      username: response.userstate.username,
                      id: response.userstate.id,
                    };
                    response.userstate.username = u[0];
                    response.userstate.id = u[1];

                    response.message.messageText = response.message.messageText.replace(msgmatches.user[0], "");
                    return resolve();
                  })
                  .catch(() => {
                    response.message.messageText = response.message.messageText.replace(msgmatches.user[0], "");
                    return resolve();
                  })
              } else {
                response.message.messageText = response.message.messageText.replace(msgmatches.user[0], "NOIDONTTHINKSO du Frechdachs");
                return resolve();
              }
            })
          };

          if (msgmatches.sendopt !== null) {
            let msgsendopt = msgmatches.sendopt[0].split(new RegExp(`\-send\:`))[1];

            j_.message._.modified_send = msgsendopt;
          };

        })
        .catch()
    };

    if (j.c().modules.message.noafk && msgmatches.noafk) msgopts.noafk = true;
    if (j.c().modules.message.noreminder && msgmatches.noreminder) msgopts.noreminder = true;

    response.message.messageText = response.message.messageText.replace(msgmatches.noafk, "").replace(msgmatches.noreminder, "").replace(msgmatches.sendopt, "").replace(msgmatches.ignorecooldown, "");
  };

  let msg = j_.message._.msg = response.message.messageText;
  let user = j_.message._.user = response.userstate.username;
  let chan = j_.message._.chan = response.channel.name;
  let _type = j_.message._.type = response.ircCommand;
  let usertag = j_.message._.usertag = `${user} > `;
  let usertag_ = j_.message._.usertag_ = `${(msg.split(" ")[1] && _regex.usernamereg().test(msg.split(" ")[1]) ? msg.split(" ")[1] : user)} > `;
  let userperm = j_.message._.userperm = await getuserperm(response.userstate.id, response.userstate.badgesRaw.split(",")[0]?.split("/")[0]);
  let userperms = j_.message._.userperms = await userperms_(j_, j);
  let args = j_.message._.args = () => { return (new RegExp(`^${j.c().prefix}`, "gi").test(msg) ? response.messageParts.slice(1) : response.messageParts) };
  let prefix = j_.message._.prefix = j.c().prefix;
  let command = j_.message._.command = (msg.split(" ")[0].split(prefix)[1] ? msg.split(" ")[0].split(prefix)[1].toLowerCase() : undefined);
  if (j.c().modules.message._ && j.c().modules.message.help && msgmatches.help && command) msgopts.help = true;

  if ([1, 2].includes(j.c().modules.log.twitch.privmsg) && j.files().clientchannels.logchannels.includes(response.channel.id)) _log(0, `${_staticspacer(2, "#" + chan)} ${_staticspacer(2, user)} ${msg}`);

  j_.send = (sendopt, sendmessage, sendmulti, sendreplacer) => {
    if (isNaN(sendopt) && !sendmessage) {
      sendmessage = sendopt;
      sendopt = 2;
    }

    j.send(sendopt, j_, sendmessage, response.message.id, undefined, (sendmulti ?? false), (sendreplacer ?? true));
  };

  if (response.userstate.id == j.env().T_USERID) return;

  if (j.c().modules._) {
    if (msgopts.help) {
      if (!command) return j_.send(`Error: Please specify a command to get help for`);

      if (!commands[command]) return j_.send(`Error: Command not found`);

      let command_ = commands[command];

      let cmdpermission = await _permission(0, command_.permission);
      let cmdcooldowns = [
        `${((!(command_.cooldown ?? undefined) || command_.cooldown <= 0) ? "none" : (j.c().cooldowns.cooldown == command_.cooldown ? "Default" : _cleantime(command_.cooldown, 4).time.join(" and ")))}`,
        `${((!(command_.cooldown_user ?? undefined) || command_.cooldown_user <= 0) ? "none" : (j.c().cooldowns.cooldown_user == command_.cooldown_user ? "Default" : _cleantime(command_.cooldown_user, 4).time.join(" and ")))}`
      ];

      let cmdcooldownmessage = (cmdcooldowns[0] === cmdcooldowns[1] ? `Cooldowns: ${cmdcooldowns[0]}` : `Cooldown: ${cmdcooldowns[0]}, User Cooldown: ${cmdcooldowns[1]}`)

      if (command_.arguments && command_.arguments.length > 0) {
        return j_.send(`Info about command ${command}${(command_.aliases && command_.aliases.length > 0 ? ` [${command_.aliases.join(", ")}]` : "")}: Required permission: ${(cmdpermission.name ?? cmdpermission.desc)}; ${cmdcooldownmessage}; Usage (<> = required; () = optional): ${j.c().prefix}${command} ${command_.arguments.map(a => { return `${a.required ? "<" : "("}${a.name}${(a.options && a.options.length > 0 ? `:${a.options.join("|")}` : "")}${a.required ? ">" : ")"}` }).join(" ")}`);
      } else {
        return j_.send(`Info about command ${command}${(command_.aliases && command_.aliases.length > 0 ? ` [${command_.aliases.join(", ")}]` : "")}: Required permission: ${(cmdpermission.name ?? cmdpermission.desc)}; ${cmdcooldownmessage}; Usage: ${j.c().prefix}${command}`);
      }
    };

    if (j.c().modules.afk && !msgopts.noafk) {
      _afk(2, j_, j_.message.userstate.id, null, null, true)
        .then(a => {
          if (Object.keys(a).length > 0) {
            j_.send(0, `${user} is no longer AFK: ${a.message} (${_cleantime(Date.now() - a.start, 4).time.join(" ")} ago)`);
          }
        })
        .catch(e => { });
    };

    if (j.c().modules.reminder && !msgopts.noreminder) {
      remind(4, j_, false, null, j_.message.userstate.id)
        .then(r => {
          if (r.length > 0) {
            let reminders_ = [];
            (async () => {
              for (let r2 in r) {
                if (r[r2].sender_userid === r[r2].target_userid) {
                  reminders_.push(`${r[r2].message} (${_cleantime(Date.now() - r[r2].time, 4).time.join(" ")} ago by yourself)`);
                } else {
                  await getuser(1, r[r2].sender_userid)
                    .then(u => {
                      reminders_.push(`${r[r2].message} (${_cleantime(Date.now() - r[r2].time, 4).time.join(" ")} ago by ${u[0]} (${u[1]}))`);
                    })
                    .catch(() => {
                      reminders_.push(`${r[r2].message} (${_cleantime(Date.now() - r[r2].time, 4).time.join(" ")} ago by ${r[r2].sender_userid})`);
                    })
                }
              }
              j_.send(0, `${usertag} You have ${r.length} new Reminders ${reminders_.join("; ")}`);
            })();
          }
        })
        .catch(e => { })
    };
  };

  if (response.message.bits > 0) {
    let channelnotifications = (files.channels.channels?.[response.channelID]?.["notifications"] ?? {});
    function executenotification(notificationname) {
      if (!Object.keys(channelnotifications).includes(notificationname) || ![1].includes(channelnotifications[notificationname].state)) return;
      j.send(0, response.channelName, files.channels.channels[response.channelID]["notifications"][notificationname].message || j.c().notifications.defaultmessages.cheer);
    };

    executenotification("cheer");
  };

  // reply(j.client.symbol, "test", response.channelName, response.messageID);

  _channel(0, response.channel.id, undefined, undefined, true)
    .then(ch => {
      prefix = j_.message._.prefix = (ch.prefix ? (new RegExp(`^${j.c().prefix}+`).test(msg) ? j.c().prefix : ch.prefix) : j.c().prefix);
      args = j_.message._.args = () => { return response.messageParts.slice(1) };
      if (new RegExp(`^${prefix}+\\w+`, "gi").test(msg)) {
        let always_allowed = j.c().commands.always_allowed;
        let command = j_.message._.command = msg.split(" ")[0].split(prefix)[1].toLowerCase();
        if (!ch.allowed_commands || always_allowed.includes(command) || ch.allowed_commands.includes(command) || userperms._default) {
          let command_ = [];
          if (ch.commands) command_ = _combineArr(...Object.keys(ch.commands).map(cmd => { return _combineArr(ch.commands[cmd].name, ch.commands[cmd].aliases) }));
          if (!always_allowed.includes(command) && !j.c().commands.custom.restricted.includes(command) && ch.commands && command_ && command_.includes(command)) {
            custom_commandhandler(j_, response)
          } else {
            commandhandler(j_, response)
          };
        }
      } else if (ch.keywords && new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => { return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases) })).join("|")})\\b`, "i").test(msg.toLowerCase())) {
        let keyword = j_.message._.keyword = msg.toLowerCase().match(new RegExp(`\\b(${_combineArr(...Object.keys(ch.keywords).map(key => { return _combineArr(ch.keywords[key].name, ch.keywords[key].aliases) })).join("|")})\\b`, "i"))[0];
        custom_keywordhandler(j_, response);
      }
    })
    .catch(e => {
      console.error(e);
      if (!new RegExp(`^${prefix}+[\\w]+`).test(msg)) return;
      let command = j_.message._.command = msg.split(" ")[0].split(j.c().prefix)[1].toLowerCase();
      commandhandler(j_, response);
    })
};