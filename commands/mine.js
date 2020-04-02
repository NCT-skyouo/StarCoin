exports.run = async (client, msg, args) => {
  const db = client.db
  let i = await db.fetch(`mine_${msg.member.id}`);
  if (i == 2) return msg.reply("You cannot mine again.");
  db.set(`mine_${msg.member.id}`, 1)
  let starbag = await db.fetch(`starbag_${msg.member.id}`);
  let starpond = await db.fetch(`starpond`);
  
  if (starpond == null) db.set("starpond", 2100);
  const Discord = client.discord;
  let { random } = require("../functions.js");
  let time = random(10) + 2;
  let timems = time * 3600000;
  msg.channel.send(`> 您开始了挖矿\n预计挖矿时间为${time}小时`);
  setTimeout(async () => {
    let result = random(100);
    let money;
    if (result > 30) money = 0 * time;
    if (result <= 30) money = 0.1 * time;
    if (starpond - result < 0 || starpond < 1) return;
    db.add(`starbag_${msg.member.id}`, money);
    db.subtract("starpond", money);
    let news = await db.fetch(`starbag_${msg.member.id}`);
    let newp = await db.fetch(`starpond`);
    let embed = new Discord.RichEmbed()
      .setTitle("挖矿完毕")
      .setColor("RED")
      .addField("你挖到了", money)
      .addField("您的余额", news)
      .addField("starpond剩余", newp)
      .setTimestamp();
    msg.reply(embed);
    db.set(`mine_${msg.member.id}`, 0);
  }, timems);
};
