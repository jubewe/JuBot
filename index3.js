const { WebSocket } = require("ws");
const _log = require("./functions/_log");

const ws = new WebSocket("ws://127.0.0.1:3000");
ws.on("open", () => {
    _log(0, `WS OPEN`)
    // ws.send(Buffer.from(JSON.stringify({type: "test"})));
    ws.send(Buffer.from(JSON.stringify({type: "login", oauth_token: "7gblm0c3ry2rfa2cwp8qibqk544g97"})));
    setTimeout(() => {
        ws.send(Buffer.from(JSON.stringify({type: "get_user_channels"})));
    }, 2000);
});

ws.on("message", message => {
    _log(0, `WS MESSAGE ${message}`);
    
});

ws.on("ping", () => {
    console.log("ping");
    ws.pong();
});

ws.on("close", (code, c) => {
    console.log(`${code} ${Buffer.from(c).toString("utf-8")}`);
})