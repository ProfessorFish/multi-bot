const fetch = require("node-fetch")
const Discord = require("discord.js")
module.exports = {
  triggers: ["meme", "memes"],
  description: "Display a random meme",
  usage: "meme",
  run: async function(client, message, db, config){
    var hasFound = false
    while(!hasFound){
    await fetch("https://meme-api.herokuapp.com/gimme").then(res=> res.json()).then(async json=>{
      if(!json.nsfw || (json.nsfw && message.channel.nsfw)){
      const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setAuthor(json.title, json.preview[json.preview.length - 1],json.postLink)
    .setImage(json.preview[json.preview.length - 1])
    .setFooter(`Upvotes: ${json.ups} || Author: ${json.author} || Subreddit: ${json.subreddit}`)
    message.channel.send({embeds: [embed]})
    hasFound = true
      }
    })
    }
  }
}