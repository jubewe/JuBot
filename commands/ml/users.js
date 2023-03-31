const j_ = require("../classes/j_");
const files = require("../variables/files");
const j = require("../variables/j");

module.exports = {
    name: "users",
    /** @param {j_} response */
    exec: async (response) => {
        response.reply(`VoHiYo Found ${await j.modinfosplitter.getMainKey(["users", "num"]) ?? 0} mods in the database`);
    }
};