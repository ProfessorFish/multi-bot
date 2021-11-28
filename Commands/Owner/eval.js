const Discord = require("discord.js")
module.exports = {
  triggers: ["eval"],
  description: "Run code. (OWNER ONLY)",
  usage: "eval <code>",
  run: async function(client, message, db, config){
    if(config.owner.find(k=> k.id === message.author.id))return message.channel.send("Only the bot owner(s) can run this command!")
    const args = message.content.split(" ")
    if(args[0].includes(client.user.id)){
      args.splice(0, 2)
    } else{
      args.splice(0, 1)
    }
    try{
    let value = eval(args.join(" "))
    const embed = new Discord.MessageEmbed()
    .setColor(config.success_embed_colour)
    .setTitle("SUCCESS")
    .setDescription("**TYPE:**\n```js\n" +typeof value+ "```\n**RESULT:**\n" + "```js\n" + value + "```")
    message.channel.send({embeds: [embed]})
    } catch(err){
      const embed = new Discord.MessageEmbed()
      .setColor(config.fail_embed_colour)
      .setDescription(`**ERROR:**\n${err}`)
      message.channel.send({embeds: [embed]})
    }
  }
}