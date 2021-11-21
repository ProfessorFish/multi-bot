const Discord = require("discord.js")
module.exports = {
  triggers: ["8ball"],
  description: "Answers a question.",
  usage: "8ball <question>",
  run: async function(client, message, db, config){
    const args = message.content.split(" ")
    args.splice(0, 1)
    var responses = [//Add your own responses here if you want to!
    "Yes",
    "Absolutely",
    "Definitely",
    "I'm not sure",
    "Ask again later",
    "No",
    "Never",
    "Definitely not",
    "Absolutely not"
    ]
    var response = responses[Math.floor(Math.random() * responses.length)]
    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setTitle("Contacting the Oracle")
    var m = await message.channel.send({embeds: [embed]})
    setTimeout(async function(){
      const embed2 = new Discord.MessageEmbed()
      .setColor(config.embed_colour)
      .setAuthor("You asked:")
      .setTitle(args.join(" "))
      .setDescription("**The Oracle responds:**\n" + response)
      m.edit({embeds: [embed2]})
    }, Math.floor(Math.random() * 5) * 1000)
  }
}