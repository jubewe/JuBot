function getpcip(){
    function _getips(){
        let ips = {
            "ipv4": [],
            "ipv6": []
        };
    
        let networkinterfaces = require("os").networkInterfaces();
        for(let networkinterface in networkinterfaces){
            let nif = networkinterfaces[networkinterface];
            if(Array.isArray(nif)){
                for(let nif2 in nif){
                    ips[nif[nif2].family.toLowerCase()].push(nif[nif2]);
                }
            }
        }
    
        return ips;
    };

    let piip = _getips().ipv4[1].address;
    if(piip.match(/192\.168\.2\./g)){
        return "192.168.2.103";
    } else {
        return "192.168.178.44";
    }
};

getpcip();

module.exports = getpcip;