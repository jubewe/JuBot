const files = require("../variables/files");
const paths = require("../variables/paths");
const _wf = require("./_wf");

async function _cache(cacheopt, cachekey, cachevalue){
    return new Promise(function(resolve, reject) {
        let cache = files.cache;

        (async() => {
            switch (cacheopt) {
                case 0: {
                    if(cachekey){
                        if(Object.keys(cache).includes(cachekey)){
                            return resolve(cache[cachekey]);
                        } else {
                            return reject({"path":[cacheopt,1,0],"msg":"cache does not include cachekey"});
                        }
                    } else {
                        return resolve(cache);
                    }
    
                    break;
                }

                case 1: {
                    if(!cachekey) return reject({"path":[cacheopt,0],"msg":"cachekey is undefined"});
                    if(!cachevalue) return reject({"path":[cacheopt,1,0],"msg":"cachevalue is undefined"});
                    cache[cachekey] = {
                        "data": cachevalue,
                        "_cache": {
                            "add_time": Date.now()
                        }
                    };
                    _wf(paths.cache, cache);

                    return resolve(cache[cachekey]);

                    break;
                }

                case 2: {
                    if(!cachekey) return reject({"path":[cacheopt,0],"msg":"cachekey is undefined"});
                    if(Object.keys(cache).includes(cachekey)){
                        delete cache[cachekey];
                        _wf(paths.cache, cache);

                        return resolve(cache[cachekey]);
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