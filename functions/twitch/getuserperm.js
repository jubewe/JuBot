async function getuserperm(guuser, badge) {
  // const permission = require("./_permission");
  return new Promise((resolve, reject) => {
    let c = require("../../config.json");
    let files = require("../../variables/files");
    if(!(guuser ?? undefined)) return files.permissions.permissions["10"];
    guuser = guuser.toString();
    if (files.permissions.users[guuser]) {
      return resolve({...files.permissions.permissions[files.permissions.users[guuser]], num:files.permissions.users[guuser]});
    } else {
      if (badge) {
        let badges = {};
        Object.keys(files.permissions.permissions).forEach(a => {
          if (files.permissions.permissions[a].name) {
            badges[files.permissions.permissions[a].name] = files.permissions.permissions[a];
            badges[files.permissions.permissions[a].name].num = a;
          }
        });
        if (badges[badge]) return resolve(badges[badge]);
      }
      return resolve(files.permissions.permissions["10"]);
    }
  })
};

module.exports = getuserperm;