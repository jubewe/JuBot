module.exports = {
    numregex: () => {return new RegExp(`^([\\d]{1,})$`, "g")},
    numregex_: (nur) => {return new RegExp(`^([\\d]{1,})$`, "g").test(nur)},
    usernamereg: () => {return new RegExp(`\\b^\\w{3,32}$\\b`, "g")},
    dc_usernamereg: () => {return new RegExp(`^\.{3,32}#[0-9]{4}$`, "gmi")},
    replacer: () => {return new RegExp(`[@#-]`, "g")},
    nobotreg: () => {return new RegExp(`(\\-)+(((no|remove)+bot(s*))|((r|n)+b))`, "g")},
    ranknumreg: () => {return new RegExp(`(\\-)+[\\d]+`, "g")},
    tokenreg: () => {return new RegExp(`^\\b[\\w]{30}\\b$`, "g")},
    timereg1: () => {return new RegExp(`^\\b([\\d]+[a-z]+)\\b$`, "g")},
    timereg2: () => {return new RegExp(`^\\b(([\\d]{2,}+\:){1,}+([\\d]{2}))\\b$`, "g")},
    timereg3: () => {return new RegExp(`^\\b(\\d{2,}+\:){1,}+(\\d{2})+[a-z]\\b$`, "g")},
    timereg4: () => {return new RegExp(`^(\\d{4}+(\-+\\d{2}+){2}+T+\\d{2}(\:+\\d{2}){2}+\.+[\\d]+Z)$`, "g")},
    timeregall: () => {return new RegExp(`^\\b\\d+([smhd]+[\\W_]*?)\\b$`, "g")},
    jsonreg: () => {return new RegExp(`^\\{+[\\W\\w]*\\}$`, "g")},
    arrayreg: () => {return new RegExp(`^\\[+[\\W\\w]*\\]$`, "g")},
    urlreg: () => {return new RegExp(`(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})`, "g")},
    j_id_custom_commandreg: () => {return new RegExp(`[\\d]+\\_+command+\\_+[\\d]+`)},
    j_id_global_commandreg: () => {return new RegExp(`global+\\_+commands+\\_+[\\w]+`)},
    j_id_custom_keywordreg: () => {return new RegExp(`[\\d]+\\_+keyword+\\_+[\\d]+`)},
    j_id_custom_counterreg: () => {return new RegExp(`[\\d]+\\_+counter+\\_+[\\d]+`)},
    seventv_emote_urlreg: () => {return new RegExp(`(h(t){2}ps\:(\/){2})7tv\.app\/emotes\/+\\b[\\w]+\\b`)},
    seventv_emote_urlreg_2: () => {return new RegExp(`(h(t){2}ps\:(\/){2})7tv\.app\/emotes\/+`)},
    yt_channel_reg: () => {return new RegExp(`^\\w+$`)},
    t_actionreg: () => {return new RegExp(`(ban|unban|timeout|untimeout)`, "gi")},
    t_clip_urlreg: () => {return new RegExp(`https?:\/\/(?:www\\.|(?!www))((clips\.)(twitch\.tv)\/|(twitch\.tv\/[\\w]+\/clip+\/))`, "gi")},
    t_video_urlreg: () => {return new RegExp(`https?:\/\/(?:www\\.|(?!www))((twitch\.tv)(\/videos)\/|(twitch\.tv\/[\\w]+\/videos+\/))`, "gi")},
    t_url_param_period: () => {return new RegExp(`(all|day|month|week)`, "gi")},
    t_url_param_sort: () => {return new RegExp(`(time|trending|views)`, "gi")},
    t_url_param_type: () => {return new RegExp(`(all|archive|highlight|upload)`, "gi")},
    t_poll_title: () => {return new RegExp(`(\"+\\w+\")`, "gi")},
    spacestartendreg: () => {return new RegExp(`(^\\s|\\s$)`, "g")},
    twitch: {
        message: {
            action: () => {return /^\u0001ACTION (.*)\u0001$/}
        }
    }

};