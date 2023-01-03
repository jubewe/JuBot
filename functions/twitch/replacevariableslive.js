async function replacevariableslive(message, response){
  let livematches = message.match(new RegExp(`\\$\\(live\.[^\\)]+\\)`, "gi"));
  for(let livematch in livematches){
    let livematchkey = livematches[livematch].split(new RegExp(`^\\$\\(live\.`))[1].split(new RegExp(`\\)$`))[0];
    message = message.replace(livematches[livematch], response[livematchkey] || `[Error: Key not found]`);
  }

  return message;
};

/**
{
  id: '46263879628',
  user_id: '263830208',
  user_login: 'jubewe',
  user_name: 'Jubewe',
  game_id: '1469308723',
  game_name: 'Software and Game Development',
  type: 'live',
  title: 'doing stuff | phil troll Kappa',
  viewer_count: 2,
  started_at: '2022-11-05T09:02:48Z',
  language: 'de',
  thumbnail_url: 'https://static-cdn.jtvnw.net/previews-ttv/live_user_jubewe-{width}x{height}.jpg',
  tag_ids: [ '9166ad14-41f1-4b04-a3b8-c8eb838c6be6' ],
  is_mature: true
}
 */

module.exports = replacevariableslive;