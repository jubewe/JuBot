const { DiscordAPIError } = require("discordjs13.11.0");
const _error = require("../../functions/_error");
let j = require("../../variables/j");

/**
 * @param {DiscordAPIError} error 
 */


module.exports = (error) => {
    _error(error);
    throw new DiscordAPIError(error);
};