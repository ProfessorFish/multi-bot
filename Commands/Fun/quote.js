const Discord = require("discord.js")
const fetch = require("node-fetch")
module.exports = {
  triggers: ["quote"],
  description: "Get a random quote.",
  usage: "quote",
  run: async function(client, message, db, config){
    fetch('https://no-api-key.com/api/v2/quotes')
        .then(res => res.json())
        .then(json => {
          const embed = new Discord.MessageEmbed()
            .setColor(config.embed_colour)
            .setAuthor(json.author)
            .setTitle(json.quote)
          message.channel.send({embeds: [embed]})
        })
  }
}