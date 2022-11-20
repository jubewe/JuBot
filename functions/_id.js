const files = require("../variables/files");
const paths = require("../variables/paths");
const { nonarr } = require("../variables/varstatic");
const _nonarr = require("./_nonarr");
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
  return new Promise(function (resolve, reject) {
    idchan = nonarr.includes(idchan) ? undefined : idchan.toString();
    idkey = _nonarr(idkey, undefined);

    switch (idopt) {
      case 0: {
        if (Object.keys(files.ids).includes(idtype)) {
          if (!idchan) {
            if (idkey) {
              return resolve(files.ids[idtype][idkey]);
            } else {
              return resolve(files.ids[idtype]);
            }
          }

          if (files.idsids[idtype][idchan]) {
            if (!idkey) return resolve(files.ids[idtype][idchan]);
            return resolve([
              `${idchan}_${idkey}_${files.ids[idtype][idchan][idkey]}`,
              files.ids[idtype][idchan][idkey],
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
        if (!Object.keys(files.ids).includes(idtype)) files.ids[idtype] = {};
        let idreturn = [];

        if (idchan) {
          if (!Object.keys(files.ids[idtype]).includes(idchan)) files.ids[idtype][idchan] = {};
          if (!Object.keys(files.ids[idtype][idchan]).includes(idkey)) files.ids[idtype][idchan][idkey] = 0;
          
          files.ids[idtype][idchan][idkey]++;
          
          let idnum = files.ids[idtype][idchan][idkey];
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

          if (Object.keys(files.ids[idtype]).includes(idkey) === false) files.ids[idtype][idkey] = 0;
          files.ids[idtype][idkey]++;
          let idnum = files.ids[idtype][idkey];
          idreturn = [`global_${idkey}_${idnum}`, idnum.toString()];
        }

        _wf(paths.ids, files.ids);

        return resolve(idreturn);

        break;
      }

      default: {
        return reject({ path: [idopt, 0], msg: "idopt is NaN" });
      }
    }
  });
}

module.exports = _id;