const rateLimit = require("express-rate-limit");
const _rf = require("../functions/_rf");
let admin_logins = _rf("./express/oauth/admin_logins.json", true);

const _default = _rateLimit(1000*60*10, 100, true, false);

const _valorantrank = _rateLimit(null, 200, true, false);

async function skipadmin(req, res, skip) {
  let sr = (req.headers.username && req.headers.password && Object.keys(admin_logins).includes(req.headers.username) && admin_logins[req.headers.username] === req.headers.password)
  return sr;
};

function _rateLimit(windowMs, max, standardHeaders, legacyHeaders, message, statusCode, requestPropertyName, skipFailedRequests, skipSuccessfulRequests, keyGenerator, handler, onLimitReached, requestWasSuccessful, skip, store) {
  [...arguments].map(a => {
    [null, undefined].includes(a) ? a = undefined : a;
  })
  return rateLimit({
    windowMs: windowMs || 1000*60*10,
    max: max || 100,
    standardHeaders: standardHeaders || true,
    legacyHeaders: legacyHeaders || false,
    message: message,
    statusCode: statusCode,
    requestPropertyName: requestPropertyName,
    skipFailedRequests: skipFailedRequests,
    skipSuccessfulRequests: skipSuccessfulRequests,
    keyGenerator: keyGenerator,
    handler: handler,
    onLimitReached: onLimitReached,
    requestWasSuccessful: requestWasSuccessful,
    store: store,
    skip: skip || skipadmin,
  });
};

module.exports = {
  "_default": _default,
  "%2F": _default,
  "%2Fping": _default,
  "%2Fvalorantrank%2F%3Ariotid%2F%3Atagline": _valorantrank

};