function requestopts(romethod, rotoken){
    let j = require("../variables/j");
    if(romethod !== undefined){
        return {
            method: romethod,
            headers: {
              'Client-ID' : j.env().T_CLIENTID,
              'Accept' : 'application/vnd.twitchtv.v5+json',
              'Authorization' : `Bearer ${rotoken === undefined || rotoken === 0 ? j.env().T_TOKEN : rotoken}`,
            }
        }
    } else {
        return {
            method: "GET",
            headers: {
              'Client-ID' : j.env().T_CLIENTID,
              'Accept' : 'application/vnd.twitchtv.v5+json',
              'Authorization' : `Bearer ${j.env().T_TOKEN}`,
            }
        }
    }
};

module.exports = requestopts;