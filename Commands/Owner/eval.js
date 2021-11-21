const Discord = require("discord.js")
module.exports = {
  triggers: ["eval"],
  description: "Run code. (OWNER ONLY)",
  usage: "eval <code>",
  run: async function(client, message, db, config){
    if(message.author.id != config.owner)return message.channel.send("Only the bot owner can run this command!")
    const args = message.content.split(" ")
    args.splice(0, 1)
    console.log(args)
    try{
    let value = eval(args.join(" "))
    const embed = new Discord.MessageEmbed()
    .setColor(config.success_embed_colour)
    .setTitle("SUCCESS")
    .setDescription("**RESULT:**\n" + value)
    message.channel.send({embeds: [embed]})
    } catch(err){
      const embed = new Discord.MessageEmbed()
      .setColor(config.fail_embed_colour)
      .setDescription(`**ERROR:**\n${err}`)
      message.channel.send({embeds: [embed]})
    }
  }
}