async function cache(cacheopt, cachekey, cachevalue){
    return new Promise(function(resolve, reject) {
        let j = require("../variables/j");
        let cache = j.functions()._rf(j.paths().cache, true);

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
                    j.functions()._wf(j.paths().cache, cache);

                    return resolve(cache[cachekey]);

                    break;
                }

                case 2: {
                    if(!cachekey) return reject({"path":[cacheopt,0],"msg":"cachekey is undefined"});
                    if(Object.keys(cache).includes(cachekey)){
                        delete cache[cachekey];
                        j.functions()._wf(j.paths().cache, cache);

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

module.exports = cache;