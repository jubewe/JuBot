/**
 * @param {number} opt 
 * @param {string} username 
 * @param {string} token 
 */

const paths = require("../../variables/paths");
const _wf = require("../_wf");

async function admin_token(opt, username, token){
    return new Promise(async (resolve, reject) => {
        let files = require("../../variables/files");
        // return [username, token];
        // token: <username>
        // username: <token>
    
        switch (opt) {
            case 0: {
                if(username){
                    if(files.express.auth.admin_tokens.usernames[username]){
                        return resolve([username, files.express.auth.admin_tokens.usernames[username]]);
                    } else {
                        return reject({path:[opt,1,0],msg:"username not found in admin tokens [usernames]"});
                    }
                }
                if(token){
                    token = token.replace(/(oauth\:)/gi, "").toLowerCase();
                    if(files.express.auth.admin_tokens.tokens[token]){
                        return resolve([files.express.auth.admin_tokens.tokens[token], token]);
                    } else {
                        return reject({path:[opt,1,0],msg:"token not found in admin tokens [tokens]"});
                    }
                }

                return reject(files.express.auth.admin_tokens);

                break;
            }

            case 1: {
                if(!username || !token) return reject({path:[opt,0],msg:"username or token is undefined"});

                if(!files.express.auth.admin_logins[username]) return reject({path:[opt,1,0], msg:"username not found in admin logins"});

                files.express.auth.admin_tokens.usernames[username] = token;
                files.express.auth.admin_tokens.tokens[token] = username;

                _wf(paths.express.auth.admin_tokens, files.express.auth.admin_tokens, true);

                return resolve(true);

                break;
            }

            case 2: {
                if(!username && !token) return reject({path:[opt,0],msg:"username and token are undefined"});

                if(!username){
                    if(files.express.auth.admin_tokens.tokens[token]) username = files.express.auth.admin_tokens.tokens[token];
                } 
                if(!token){
                    if(files.express.auth.admin_tokens.usernames[username]) token = files.express.auth.admin_tokens.usernames[username];
                }

                if(!username || !token) return reject({path:[opt,1,0],msg:"username or token not found in admin tokens"});

                delete files.express.auth.admin_tokens.usernames[username];
                delete files.express.auth.admin_tokens.tokens[token];

                _wf(paths.express.auth.admin_tokens, files.express.auth.admin_tokens, true);
                
                return resolve(true);
            }
        }
    });
};

module.exports = admin_token;