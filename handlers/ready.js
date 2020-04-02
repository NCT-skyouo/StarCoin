module.exports = async (bot, message) => {
  console.log(`log in as ${bot.user.tag}`)
  let starpond = await bot.db.fetch(`starpond`)
  if (starpond == null) bot.db.set(`starpond`, 9999999999999)
  
}