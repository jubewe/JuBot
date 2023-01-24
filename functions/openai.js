/**
 * @see https://beta.openai.com/docs/api-reference/
 */

const request = require("request");
const urls = require("../variables/urls");
const { e } = require("../variables/varstatic");

let reqopts = {
    headers: {
        "Authorization": `Bearer ${e().OPENAI_API_KEY}`,
        "Content-Type": "application/json"
    },
    method: "POST",
    timeout: 60000
};

/**
 * @param {String | Object} model String: @see https://beta.openai.com/docs/models/overview Object: @see https://beta.openai.com/docs/api-reference/completions/create
 * @param {String} prompt *required
 * @param {String} suffix 
 * @param {Number} max_tokens 
 * @param {Number} temperature 
 * @param {Number} top_p 
 * @param {Number} n 
 * @param {Boolean} stream 
 * @param {Number} logprobs 
 * @param {Boolean} echo 
 * @param {String | Array} stop 
 * @param {Number} presence_penalty 
 * @param {Number} frequency_penalty -2.0 to 2.0
 * @param {Number} best_of 
 * @param {Map} logit_bias 
 * @param {String} user
 * @default model text-davinci-003 
 * @default suffix null
 * @default max_tokens 1000
 * @default temperature 1
 * @default top_p 1
 * @default n 1
 * @default stream false
 * @default logprobs null
 * @default echo false
 * @default stop null
 * @default presence_penalty 0
 * @default best_of 1
 * @default logit_bias null
 */

async function completion(model, prompt, suffix, max_tokens, temperature, top_p, n, stream, logprobs, echo, stop, presence_penalty, frequency_penalty, best_of, logit_bias, user) {
    return new Promise((resolve, reject) => {
        let reqparameters = {};

        max_tokens = ((max_tokens ?? undefined) ? max_tokens : 1000);

        if((model ?? undefined) && typeof model === "object"){
            reqparameters = model;
            reqparameters.model = "text-davinci-003";
        } else {
            reqparameters.model = (model ?? undefined) ? model : "text-davinci-003";
            if((prompt ?? undefined)){reqparameters.prompt = prompt};
            if((suffix ?? undefined)){reqparameters.suffix = suffix};
            if((max_tokens ?? undefined)){reqparameters.max_tokens = max_tokens};
            if((temperature ?? undefined)){reqparameters.temperature = temperature};
            if((top_p ?? undefined)){reqparameters.top_p = top_p};
            if((n ?? undefined)){reqparameters.n = n};
            if((stream ?? undefined)){reqparameters.stream = stream};
            if((logprobs ?? undefined)){reqparameters.logprobs = logprobs};
            if((echo ?? undefined)){reqparameters.echo = echo};
            if((stop ?? undefined)){reqparameters.stop = stop};
            if((presence_penalty ?? undefined)){reqparameters.presence_penalty = presence_penalty};
            if((frequency_penalty ?? undefined)){reqparameters.frequency_penalty = frequency_penalty};
            if((best_of ?? undefined)){reqparameters.best_of = best_of};
            if((logit_bias ?? undefined)){reqparameters.logit_bias = logit_bias};
            if((user ?? undefined)){reqparameters.user = user};
        }


        if(!(reqparameters.prompt ?? undefined)) return reject({peth:[0],msg:"prompt is undefined"});

        reqopts.body = JSON.stringify(reqparameters);

        request(urls.openai.completions.completions, reqopts, (e, r) => {
            if(e) return reject(e);
            if(r.statusCode !== 200) return reject(r.body);

            let dat = JSON.parse(r.body);
            return resolve(dat);
        })
    });
};

class openai {
    static completion = class {
        static completion = completion;
    }
};

module.exports = openai;