const Discord = require("discord.js")
const pretty = require("pretty-ms")
module.exports = {
  triggers: ["info", "info"],
  description: "Display information about the bot.",
  usage: "info",
  run: async function(client, message, db, config){
    var os = process.platform
    var cpu = process.cpuUsage()
    var memory = process.memoryUsage()
    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`OS: ${os}\nCPU usage: ${cpu.user/cpu.system}%\nMemory usage: ${memory.heapTotal/memory.heapUsed}%\nCommand count: ${client.commands.length}\nBot creation date: ${Date(client.user.createdTimestamp).toString()}\nOnline since: ${Date(client.uptime)} (${pretty(client.uptime)} ago)\nPing: Pinging`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}), "https://github.com/ProfessorFish/multi-bot")//Remove the link and the comma after author if you want to :)
    .setFooter("Forked off of: https://github.com/ProfessorFish/multi-bot")//Feel free to remove the credit :)
    var m = await message.channel.send({embeds: [embed]})
    const embed2 = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`OS: ${os}\nCPU usage: ${cpu.user/cpu.system}%\nMemory usage: ${memory.heapTotal/memory.heapUsed}%\nCommand count: ${client.commands.length}\nBot creation date: ${Date(client.user.createdTimestamp).toString()}\nOnline since: ${Date(client.uptime)} (${pretty(client.uptime)} ago)\nPing: ${m.createdTimestamp - message.createdTimestamp}ms`)
    .setAuthor(client.user.tag, client.user.displayAvatarURL({dynamic: true}), "https://github.com/ProfessorFish/multi-bot")//Remove the link and the comma after author if you want to :)
    .setFooter("Forked off of: https://github.com/ProfessorFish/multi-bot")//Feel free to remove the credit :)
    m.edit({embeds: [embed2]})
  }
}