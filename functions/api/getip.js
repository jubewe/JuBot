function getip(device, opt){
    function _getips(){
        let ips = {
            "ipv4": [],
            "ipv6": [],
            "_raw": undefined
        };
    
        let networkinterfaces = require("os").networkInterfaces();
        ips._raw = networkinterfaces;
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

    let deviceips = {
        "_base": ["192.168.2", "192.168.178"],
        "pi": ["170", "198"],
        "pc": ["103", "44"]
    };

    let piraw = _getips()._raw;
    let piip = _getips().ipv4[1].address;
    if(piip.match(/192\.168\.2\./g)){
        return (!(opt ?? undefined) || opt === 0 ? `${deviceips._base[0]}.${deviceips[device ?? "pc"][0]}` : piraw)
    } else {
        return (!(opt ?? undefined) || opt === 0 ? `${deviceips._base[1]}.${deviceips[device ?? "pc"][1]}` : piraw)
    }
};

module.exports = getip;