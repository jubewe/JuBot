/**
 * 
 * @param {string} username 
 * @param {string} password 
 * @param {any} data 
 * @returns 
 */

const env = require("dotenv").config().parsed;

function api_requestheaders(username, password, data){
    username = username || env.API_USERNAME;
    password = password || env.API_PASSWORD;
    data = data || {};
    return {
        username: username,
        password: password,
        data: data
    };
};

module.exports = api_requestheaders;