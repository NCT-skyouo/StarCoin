exports.run = async (bot, msg, args) => {
  if (!args) return;
  let user = msg.guild.member(msg.mentions.users.first()) || bot.users.get(args[0]);
  let topay = parseInt(args[1]);
  if (isNaN(topay)) return console.log(10);
  let balwas = await bot.db.fetch(`starbag_${msg.member.id}`);
  if (topay < 1 || topay > balwas) return;
  bot.db.add(`starbag_${user.id}`, topay);
  bot.db.subtract(`starbag_${msg.member.id}`, topay);
  let bal = await bot.db.fetch(`starbag_${msg.member.id}`);
  let embed = new bot.discord.RichEmbed()
    .setTitle(`转帐成功`)
    .setColor("#ffee07")
    .addField("您转帐给", user)
    .addField("转帐金额", topay)
    .addField("您的余额", bal)
    .setFooter("owo");

  msg.channel.send(embed);
};
