/**
 * @param {number} permopt
 * @param {number} permnum
 * @param {number} permuser userid
 * @returns
 */

async function _permission(permopt, permnum, permuser) {
  return new Promise((resolve, reject) => {
    let files = require("../../variables/files");
    switch (permopt) {
      default:
      case 0: {
        if (permnum) {
          permnum = permnum.toString();
          if (Object.keys(files.discord.permissions.permissions).includes(permnum)) {
            return resolve({
              num: permnum,
              desc: files.discord.permissions.permissions[permnum].desc,
              name:
              files.discord.permissions.permissions[permnum].name !== undefined
                  ? files.permissions.permissions[permnum].name
                  : null,
            });
          }
        }
        return resolve({
          num: 10,
          desc: files.discord.permissions.permissions[10].desc,
          name: null,
        });
        break;
      }

      case 1: {
        if (permnum) {
          if (permuser) {
            files.discord.permissions.users[permuser] = permnum;
            return resolve({
              path: [1, 1, 1],
              msg: "Successfully set users perm",
            });
          } else {
            return reject({ path: [1, 1, 0], msg: "permuser is undefined" });
          }
        } else {
          return reject({ path: [1, 0], msg: "permnum is undefined" });
        }
        break;
      }

      case 2: {
        if (permuser) {
          delete files.discord.permissions.users[permuser];
          return resolve({ path: [2, 1], msg: "Successfully deleted user" });
        } else {
          return reject({ path: [2, 0], msg: "permuser is undefined" });
        }
        break;
      }
    }
  });
}

module.exports = _permission;
