function _requestopts(romethod, rotoken, roclientid){
    let j = require("../variables/j");
    if(romethod){
        return {
            method: romethod,
            headers: {
                'Client-ID' : (roclientid ? roclientid : j.env().T_CLIENTID),
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${!rotoken || rotoken === 0 ? j.env().T_TOKEN : rotoken}`,
            }
        }
    } else {
        return {
            method: "GET",
            headers: {
                'Client-ID' : j.env().T_CLIENTID,
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${j.env().T_TOKEN}`,
            }
        }
    }
};

module.exports = _requestopts;