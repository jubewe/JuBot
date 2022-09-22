const _rf = require("./_rf");

function _syncfile(sfmode, sfpath, sfvar){
    if(sfmode === 0){
        sfvar = _rf(sfpath);
    } else if(sfmode === 1){
        sfvar = _rf(sfpath, true);
    } else if(sfmode === 2){
        sfvar = _rf(sfpath);
        return sfvar;
    } else if(sfmode === 3){
        sfvar = _rf(sfpath, true);
        return sfvar;
    } else if(sfmode === 4){
        return _rf(sfpath);
    } else if(sfmode === 5){
        return _rf(sfpath, true);
    }
};

module.exports = _syncfile;