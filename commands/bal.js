exports.run = async (bot, msg, args) => {
  const db = bot.db
  let user = msg.guild.member(msg.mentions.users.first()) || msg.member
  let money = await db.fetch(`starbag_${user.id}`)
  if (money == null) db.set(`starbag_${user.id}`, 0)
  if (money == null) money = 0
  let starpond = await db.fetch(`starpond`)
  let embed = new bot.discord.RichEmbed()
  .setTitle(`余额`)
  .setColor("#ffee07")
  .addField("余额", money)
  .addField("starpond余额", starpond)
  .setTimestamp()
  
  msg.channel.send(embed)
}