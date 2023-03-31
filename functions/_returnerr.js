const _log = require("./_log");

/** @param {Error | object?} e @param {Boolean?} logerr */
function _returnerr(e, logerr){
    if(!e) return "";
    if(e instanceof Error && logerr) _log(2, e);
    return e.error?.message ?? e.error ?? e.message ?? e;
};

module.exports = _returnerr;