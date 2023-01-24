async function replacevariableslive(message, response){
  let livematches = message.match(new RegExp(`\\$\\(live\.[^\\)]+\\)`, "gi"));
  for(let livematch in livematches){
    let livematchkey = livematches[livematch].split(new RegExp(`^\\$\\(live\.`))[1].split(new RegExp(`\\)$`))[0];
    message = message.replace(livematches[livematch], response[livematchkey] || `[Error: Key not found]`);
  }

  return message;
};

module.exports = replacevariableslive;