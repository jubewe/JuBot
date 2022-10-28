const paths = require("../variables/paths");
const { nonarr } = require("../variables/varstatic");
const _nonarr = require("./_nonarr");
const _syncfile = require("./_syncfile");
const _wf = require("./_wf");

/**
 *
 * @param {number} idopt
 * @param {string} idtype
 * @param {number | undefined} idchan
 * @param {string} idkey
 * @returns
 */

async function _id(idopt, idtype, idchan, idkey) {
  /**
   * idtype = channel/"global"
   */
  return new Promise(function (resolve, reject) {
    idchan = nonarr.includes(idchan) ? undefined : idchan.toString();
    idkey = _nonarr(idkey, undefined);
    let ids = _syncfile(5, paths.ids);
    switch (idopt) {
      case 0: {
        if (Object.keys(ids).includes(idtype)) {
          if (!idchan) {
            if (idkey) {
              return resolve(ids[idtype][idkey]);
            } else {
              return resolve(ids[idtype]);
            }
          }

          if (ids[idtype][idchan]) {
            if (!idkey) return resolve(ids[idtype][idchan]);
            return resolve([
              `${idchan}_${idkey}_${ids[idtype][idchan][idkey]}`,
              ids[idtype][idchan][idkey],
            ]);
          } else {
            return reject({
              path: [idopt, 1, 1, 0],
              msg: "ids of idtype.ids do not include idkey",
            });
          }
        } else {
          return reject({ path: [idopt, 0], msg: "idtype does not exist" });
        }
        break;
      }

      case 1: {
        if (!Object.keys(ids).includes(idtype)) ids[idtype] = {};
        let idreturn = [];

        if (idchan) {
          if (!Object.keys(ids[idtype]).includes(idchan)) ids[idtype][idchan] = {};
          if (!Object.keys(ids[idtype][idchan]).includes(idkey)) ids[idtype][idchan][idkey] = 0;
          
          ids[idtype][idchan][idkey]++;
          
          let idnum = ids[idtype][idchan][idkey];
          idreturn = [
            `${idchan}_${idkey}_${idnum}`,
            idnum.toString(),
          ];
        } else {
          if (!idkey)
            throw new Error({
              path: [idopt, 0],
              msg: "idchan and idkey are undefined",
            });

          if (Object.keys(ids[idtype]).includes(idkey) === false) ids[idtype][idkey] = 0;
          ids[idtype][idkey]++;
          let idnum = ids[idtype][idkey];
          idreturn = [`global_${idkey}_${idnum}`, idnum.toString()];
        }

        _wf(paths.ids, ids);

        return resolve(idreturn);

        break;
      }

      default: {
        return reject({ path: [idopt, 0], msg: "idopt is NaN" });
      }
    }
  });
}

// _id(1, "channels", 263830208, "commands")
//   .then((i) => {
//     console.log(`\nReturn:`)
//     console.log(i);
//   })
//   .catch((e) => {
//     console.error(e);
//   });



module.exports = _id;
