exports.run = async (bot, msg, args) => {
  if (!args) return;
  let color;
  let topay = parseInt(args[0]);
  if (isNaN(topay)) return console.log(10);
  let balwas = await bot.db.fetch(`starbag_${msg.member.id}`);
  let sp = await bot.db.fetch('starpond')
  if (topay < 1 || topay > balwas) return;
  if (sp - topay < 0 || sp < 1) return msg.channel.send("starpond已無法提供starcoin.")
  let l = require("../functions.js")
  let my = l.random(12)
  let ur = l.random(12)
  if (my > ur) {
    bot.db.add(`starbag_${msg.member.id}`, topay)
    bot.db.subtract(`starpond`, topay)
    color = "GREEN"
  } else {
    bot.db.add(`starpond`, topay)
    bot.db.subtract(`starbag_${msg.member.id}`, topay)
    color = "RED"
  };
  let bal = await bot.db.fetch(`starbag_${msg.member.id}`);
 
  let embed = new bot.discord.RichEmbed()
    .setTitle(`賭博結果`)
    .setColor(color)
    .addField("賭注金額", topay)
    .addField("您的余额", bal)
    .addField(`你的骰子`, my)
    .addField(`我的骰子`, ur)
    .setFooter("owo");

  msg.channel.send(embed);
};
