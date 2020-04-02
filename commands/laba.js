exports.run = async (bot, msg, args) => {
  if (!args) return;
  let color;
  let list = ['<:emoji_24:675247579314782209>', '<:AJ:675584441829294080>', '<:emoji_51:684649828591861771>', '<:emoji_50:679944381008314408>']
  let topay = parseInt(args[0]);
  if (isNaN(topay)) return console.log(10);
  let balwas = await bot.db.fetch(`starbag_${msg.member.id}`);
  let sp = await bot.db.fetch('labaduli')
  if (sp == null || sp < 10) { 
    bot.db.set('labaduli', 70) 
    sp = 70;
  }
  if (topay < 1 || topay > balwas) return;
  if (sp - topay < 0 || sp < 1) return msg.channel.send('請嘗試賭少一點...')
  let l = require("../functions.js")
  let se = l.choice(list)
  let fi = l.choice(list)
  let th = l.choice(list)
  if (se == fi && fi == th && th == se) {
    bot.db.add(`starbag_${msg.member.id}`, topay)
    bot.db.subtract(`labaduli`, topay)
    color = "GREEN"
  } else {
    bot.db.add(`labaduli`, topay)
    bot.db.subtract(`starbag_${msg.member.id}`, topay)
    color = "RED"
  };
  let bal = await bot.db.fetch(`starbag_${msg.member.id}`);
  let still = await bot.db.fetch('labaduli')
  let string = fi + ' ' + se + ' ' + th
  let embed = new bot.discord.RichEmbed()
    .setTitle(`賭博結果`)
    .setColor(color)
    .addField('最終結果', string)
    .addField("賭注金額", topay)
    .addField("您的余额", bal)
    .addField('拉霸機餘額', still)
    .setFooter("owo");
  let emb = new bot.discord.RichEmbed()
    .setTitle('拉霸機')
    .setDescription('祝您順利!')
  msg.channel.send(emb).then((m) => {
    setTimeout(() => {
      m.edit(embed)
    }, 2000)
  });
};
