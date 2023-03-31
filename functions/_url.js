function _url(u) { return `https://modlookup.jubewe.de` + (!u.startsWith("/") ? "/" : "") + (u) };
module.exports = _url;