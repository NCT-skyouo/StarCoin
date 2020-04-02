module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.prefix.length).split(" ").slice(1);
  const command = message.content.slice(client.prefix.length).split(" ")[0];

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;
  if (message.member.roles.has("647709367038115840") || message.member.roles.has("647086323802439701")) return;
  // Run the command
  cmd.run(client, message, args);
};