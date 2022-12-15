// > https://discord.js.org/#/docs/discord.js/13.11.0/typedef/MessageEmbedOptions
/**
 *
 * @param {string} title
 * @param {string} description
 * @param {string} url
 * @param {date | number} timestamp
 * @param {string | Color | number | array} color
 * @param {array} fields [{name, value, inline:boolean}]
 * @param {object} author name, url, iconURL, proxyIconURL
 * @param {object} thumbnail url, proxyURL, height, width
 * @param {object} image url, proxyURL, height, width
 * @param {object} video url, proxyURL, height, width
 * @param {object} footer text, iconURL, proxyIconURL
 * @returns
 */

function messageembed(title, description, url, timestamp, color, fields, author, thumbnail, image, video, footer) {
  let j = require("../../variables/j");
  let files = require("../../variables/files");
  let args = {
    title: (title ?? ""),
    description: (description ?? "<Empty>"),
    url: (url ?? ""),
    timestamp: (timestamp ?? new Date()),
    color: (color ?? require("../../config.json").defaulthex),
    fields: (fields ?? []),
    author: (author ?? {}),
    thumbnail: (thumbnail ?? {}),
    image: (image ?? {}),
    video: (video ?? {}),
    footer: (footer ?? {}),
  };

  if(!(title ?? undefined) && description.toLowerCase().startsWith("error")) {
    args.image = (image ?? {url:files.defaults.discord.images.error + "?size=300"}); 
    args.color = "#FF0000"; title = args.title = description.split("\n")[0]; 
    args.description = description.substring(description.split("\n")[0].length+1);
  }
  // for(i = 0; i < arguments.length; i++){
  //   if(![undefined, null, 0].includes([...arguments][i])){
  //     args[Object.keys(args)[i]] = [...arguments][i];
  //   } 
  // }
  return new j.modules.discord.MessageEmbed(args);
}

module.exports = messageembed;