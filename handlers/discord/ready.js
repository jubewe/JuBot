module.exports = () => {
    let j = require("../../variables/j");

    j.functions()._log(2, `${j.functions()._stackname(["discord", "client"])} Ready`);
    j.dc.client.user.setActivity("Nothing", {url: "https://twitch.tv/jubewe"});
};