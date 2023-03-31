const request = require("request");

function mlrequest(u, options, callback) {
    if (!callback) {
        callback = options;
        options = {};
    };

    request(u, options, (e, r) => {
        if(e) return callback(e, undefined);
        
        let dat = JSON.parse(r.body);

        if (dat.error) return callback(r, undefined);
    
        callback(undefined, dat);
    });
};

module.exports = mlrequest;