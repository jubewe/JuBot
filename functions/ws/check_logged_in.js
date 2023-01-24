module.exports = (ws) => {
    if(!ws._settings || !ws._settings.logged_in) return false;
    return true;
};