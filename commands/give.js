exports.run = async (bot, msg, args) => {
  if (!msg.member.roles.has("647084462450147328")) return;
  let togive = parseInt(args.slice(1)[0])
  if (isNaN(togive)) return TypeError('gay')
  console.log(togive)
  if (togive == null) return;
  if (togive < 1 || togive > 1000) return;
  let starpond = await bot.db.fetch("starpond")
  let player = msg.guild.member(msg.mentions.users.first()) || bot.users.get(args[0]);
  bot.db.add(`starbag_${player.id}`, togive)
  bot.db.subtract(`starpond`, togive);
  msg.channel.send("成功.")
  }