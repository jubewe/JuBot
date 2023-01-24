const { WebSocket } = require("ws");

/**
 * @param {WebSocket} ws 
 * @param {string} data 
 * @param {number} status 
 */

async function send(ws, data, status){
    let d = {};
    if(data.data) d = data; else d.data = data;
    if(!d.status) d.status = (status ?? 200);

    ws.send(JSON.stringify(d));
};

module.exports = send;