const urls = require("../../variables/urls");
const ws = require("ws");

let seventv_ws = class {
    constructor(subscriptions, conditions){
        this.subscriptions = subscriptions;
        this.conditions = conditions;
        this.client = new ws.WebSocket(urls.seventv.events._base);
    };

    get emote(){
        this.create = (image) => {
            
            this.client.send();
        }
    }


    get connect() {
        // this.client.onopen
    };

    get onopen(){
        return this.client.onopen(ev => {
            return ev;
        })
    };
};

module.exports = seventv_ws;