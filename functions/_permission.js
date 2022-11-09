const files = require("../variables/files");
const paths = require("../variables/paths");
const _wf = require("./_wf");

/**
 *
 * @param {number} permopt
 * @param {number} permnum
 * @param {number} permuser userid
 * @returns
 */

function _permission(permopt, permnum, permuser) {
  return new Promise(function (resolve, reject) {
    /**
     * permopts
     * 0    get
     * 1    set
     * 2    delete
     */
    let permissions = files.permissions;
    switch (permopt) {
      default:
      case 0: {
        if (permnum) {
          permnum = permnum.toString();
          if (Object.keys(permissions.permissions).includes(permnum)) {
            return resolve({
              num: permnum,
              desc: permissions.permissions[permnum].desc,
              name:
                permissions.permissions[permnum].name !== undefined
                  ? permissions.permissions[permnum].name
                  : null,
            });
          }
        }
        return resolve({
          num: 10,
          desc: permissions.permissions[10].desc,
          name: null,
        });
        break;
      }

      case 1: {
        if (permnum) {
          if (permuser) {
            permissions.users[permuser] = permnum;
            _wf(paths.permissions, permissions);
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
          delete permissions.users[permuser];
          _wf(paths.permissions, permissions);
          return resolve({ path: [2, 1], msg: "Successfully deleted user" });
        } else {
          return reject({ path: [2, 0], msg: "permuser is indefuned" });
        }
        break;
      }
    }
  });
}

module.exports = _permission;
