const Discord = require("discord.js")
module.exports = {
  triggers: ["info", "info"],
  description: "Display information about the bot.",
  usage: "info",
  run: async function(client, message, db, config){
    var os = process.platform
    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`OS: ${os}\nCommand count: ${client.commands.length}\nBot creation date: ${Date(client.user.createdTimestamp).toString()}`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}), "https://github.com/ProfessorFish/multi-bot")//Remove the link and the comma after author if you want to :)
    .setFooter("Forked off of: https://github.com/ProfessorFish/multi-bot")//Feel free to remove the credit :)
    message.channel.send({embeds: [embed]})
  }
}