exports.run = async (bot, msg, args) => {
  if (msg.member.id != "599923291968241666") return;
  let users = msg.guild.member(msg.mentions.users.first()) || bot.users.get(args[0])
  let topay = await bot.db.fetch(`starbag_${users.id}`)
  bot.db.subtract(`starbag_${users.id}`, topay)
  bot.db.add("starpond", topay)
  msg.channel.send("完成重置資料.")
}