exports.run = async (bot, msg, args) => {
  let server = msg.guild;
  let name = args.join(" ")
  if (!name) return msg.reply("sb.");
  if (server.channels.find(c => c.name == name)) return msg.reply("此頻道已存在.");
  server.createChannel(name, "text")
  .then(async channel => {
    let category = server.channels.find(c => c.name == "SHOP | 商店类别" && c.type == "category");

    if (!category) throw new Error("Category channel does not exist");
    channel.setParent(category.id);
    msg.channel.send("頻道創建成功:" + `<#${channel.id}>`)
    bot.db.set(`${channel.id}`, msg.member.id)
  }).catch(console.error);
}