module.exports = (st) => {
    return decodeURI(Buffer.from(st, "base64"));
}