const { env } = require("../variables/j");
const urls = require("../variables/urls");

function mlapirequestopts(urlpath, options) {
    options = (options ?? {});

    options.headers = {
        ...(options.headers ?? {}),
        "auth": {"token": env().T_TOKEN}
    };

    options.url = urls.modlookup._base + urlpath;

    return options;
};

module.exports = mlapirequestopts;