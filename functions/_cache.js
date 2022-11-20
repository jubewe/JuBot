const files = require("../variables/files");
const paths = require("../variables/paths");
const _wf = require("./_wf");

async function _cache(cacheopt, cachekey, cachevalue){
    return new Promise((resolve, reject) => {
        (async() => {
            switch (cacheopt) {
                case 0: {
                    if(cachekey){
                        if(Object.keys(files.cache).includes(cachekey)){
                            return resolve(files.cache[cachekey]);
                        } else {
                            return reject({"path":[cacheopt,1,0],"msg":"cache does not include cachekey"});
                        }
                    } else {
                        return resolve(files.cache);
                    }
    
                    break;
                }

                case 1: {
                    if(!cachekey) return reject({"path":[cacheopt,0],"msg":"cachekey is undefined"});
                    if(!cachevalue) return reject({"path":[cacheopt,1,0],"msg":"cachevalue is undefined"});
                    files.cache[cachekey] = {
                        "data": cachevalue,
                        "_cache": {
                            "add_time": Date.now()
                        }
                    };
                    _wf(paths.cache, files.cache);

                    return resolve(files.cache[cachekey]);

                    break;
                }

                case 2: {
                    if(!cachekey) return reject({"path":[cacheopt,0],"msg":"cachekey is undefined"});
                    if(Object.keys(files.cache).includes(cachekey)){
                        delete files.cache[cachekey];
                        _wf(paths.cache, files.cache);

                        return resolve(files.cache[cachekey]);
                    } else {
                        return reject({"path":[cacheopt,1,0],"msg":"cache does not include cachekey"});
                    }

                    break;
                }
    
                default: {
                    return reject({"path":[0],"msg":"cacheopt not found"});
                    break;
                }
            }
        })();
    })
};

module.exports = _cache;