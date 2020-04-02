exports.run = async (bot, msg, args) => {
  const db = bot.db
  const Discord = bot.discord
    // Get all data not sorted
  const resp = await db.startsWith('starbag_', {sort: '.data'});
  // Pagination
    
  var page = page || 1,
  per_page = per_page || 5,
  offset = (page - 1) * per_page,

  paginatedItems = resp.slice(offset).slice(0, per_page),
  total_pages = Math.ceil(resp.length / per_page);
    
    let id = resp.slice('starbag_')
      console.log(id)
    
  
  // Leaderboard Message -> Make your message as you want.
  var leaderboardMessage = '';
  for (var i in paginatedItems) {
    let id = resp[i].ID.replace('starbag_', '');
    let name;
      try {
        name = await bot.users.get(id).username;
      } catch (e) {
        name = `${id}`;
      }
    leaderboardMessage += `${name} | StarCoin: ${paginatedItems[i].data} \n`;//${paginatedItems[i].ID}
  }
  
  let end = {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: resp.length,
    total_pages: total_pages,
    data: paginatedItems,
    message: leaderboardMessage
  };

  // RESULT
    console.log(leaderboardMessage)
    const topembed = new Discord.RichEmbed()
    .setColor(16777215)
    .setAuthor('富比士前五排行')
    .setDescription('前五名最富有', ` ${page}`)
    .addField(leaderboardMessage, `Top 5`)
    .setFooter(`${page} | ${per_page}`)
    return msg.channel.send(topembed)
}