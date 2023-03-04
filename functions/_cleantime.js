const _pad2 = (n) => {return n<=9?`0${n}`:n};

/**
 * @param {number} time time: time in ms
 * @param {number} timeopt
 * @param {number} timedigits
 * @returns {time} Parsed time
 */

function _cleantime(time, timeopt, timedigits) {
  let timedigits_ = 2;
  if (!(timedigits ?? undefined) || typeof timedigits !== "number" || timedigits <= 0 ) {
    timedigits = "auto";
  } else {
    timedigits_ = timedigits;
  };
  let dat = { time: [], order: [], tag: "" };
  let t = {
    years: {
      tag_: "yr",
      tag: "year",
      conversion: 365 * 24 * 60 * 60 * 1000,
      time: 0,
    },
    weeks: { tag_: "wk", tag: "week", conversion: 7 * 24 * 60 * 60 * 1000, time: 0 },
    days: {
      tag_: "day",
      tag: "day",
      conversion: 24 * 60 * 60 * 1000,
      time: 0,
    },
    hours: { tag_: "hr", tag: "hour", conversion: 60 * 60 * 1000, time: 0 },
    minutes: { tag_: "min", tag: "minute", conversion: 60 * 1000, time: 0 },
    seconds: { tag_: "sec", tag: "second", conversion: 1000, time: 0 },
    milliseconds: { tag_: "ms", tag: "millisecond", conversion: 1, time: 0 },
  };
  t.milliseconds.time = time;
  for (i = 0; i < Object.keys(t).length - 1; i++) {
    t[Object.keys(t)[i]].time = Math.floor(
      t.milliseconds.time / t[Object.keys(t)[i]].conversion
    );
    t.milliseconds.time =
      t.milliseconds.time % t[Object.keys(t)[i]].conversion;
  }
  t.milliseconds.time = parseInt(
    t.milliseconds.time.toString().substring(0, 3)
  );
  let ctlast = undefined;
  for (i = 0; i < Object.keys(t).length; i++) {
    let tc = Object.keys(t)[i];
    let tco = t[tc];
    let cte = tco.time;
    if ((["auto"].includes(timedigits_) && !["milliseconds"].includes(tc)) || timedigits_ > 0) {
      if (cte > 0 || ctlast) {
        if (ctlast === undefined) {
          dat["tag"] = `${tco["tag"]}${cte > 1 ? "s" : ""}`;
        }
        if (timeopt === 1) {
          dat["time"].push(_pad2(cte).toString());
          dat["order"].push(tc);
        } else if ([2, 3].includes(timeopt)) {
          dat["time"].push(_pad2(cte).toString());
          dat["order"].push(tc);
        } else if ([4, 5].includes(timeopt)) {
          if (cte >= 1) {
            dat["time"].push(
              cte +
                ` ${
                  tco[["tag", "tag_"][timeopt - 4]] !== "ms"
                    ? tco[["tag", "tag_"][timeopt - 4]] +
                      (cte > 1 ? "s" : "")
                    : tco[["tag", "tag_"][timeopt - 4]]
                }`
            );
            dat["order"].push(tc);
          }
        }
        timedigits_--;
        ctlast = cte;
      };
    } else {
      i = Object.keys(t).length;
    }
  };

  return dat;
}

module.exports = _cleantime;
