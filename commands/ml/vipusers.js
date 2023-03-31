const j_ = require("../classes/j_");
const j = require("../variables/j");

module.exports = {
    name: "vipusers",
    /** @param {j_} response */
    exec: async (response) => {
        response.reply(`VoHiYo Found ${await j.vipinfosplitter?.getMainKey(["users", "num"]) ?? 0} (tracked) vips in the database`);
    }
};