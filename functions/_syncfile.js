const rf = require("./_rf");

function _syncfile(sfmode, sfpath, sfvar){
    if(sfmode === 0){
        sfvar = rf(sfpath);
    } else if(sfmode === 1){
        sfvar = rf(sfpath, true);
    } else if(sfmode === 2){
        sfvar = rf(sfpath);
        return sfvar;
    } else if(sfmode === 3){
        sfvar = rf(sfpath, true);
        return sfvar;
    } else if(sfmode === 4){
        return rf(sfpath);
    } else if(sfmode === 5){
        return rf(sfpath, true);
    }
};

module.exports = _syncfile;