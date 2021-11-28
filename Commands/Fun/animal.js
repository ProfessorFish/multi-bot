const Discord = require("discord.js")
const fetch = require("node-fetch")
module.exports = {
  triggers: ["animal"],
  description: "Get a picture and fact of an animal.",
  usage: "animal [animal]",
  run: async function(client, message, db, config){
    const args = message.content.toLowerCase().split(" ")
    const animalImage = [{"animal": "dog", "api": "https://some-random-api.ml/img/dog"}, {animal: "cat", api: "https://some-random-api.ml/img/cat"}, {animal: "panda", api: "https://some-random-api.ml/img/panda"}, {animal: "bird", api: "https://some-random-api.ml/img/birb"}, {animal: "fox", api: "https://some-random-api.ml/img/fox"}, {animal: "koala", api: "https://some-random-api.ml/img/koala"}]
    const animalFact = [{animal: "dog", api: "https://some-random-api.ml/facts/dog"}, {animal: "cat", api: "https://some-random-api.ml/facts/cat"}, {animal: "panda", api: "https://some-random-api.ml/facts/panda"}, {animal: "bird", api: "https://some-random-api.ml/facts/bird"}, {animal: "fox", api: "https://some-random-api.ml/facts/fox"}, {animal: "koala", api: "https://some-random-api.ml/facts/koala"}]
    if(!args[1]){
      var ranAn = Math.floor(Math.random() * animalImage.length)
      var animalImageUrl = animalImage[ranAn].api
      var animalFactUrl = animalFact[ranAn].api
    } else{
      var animalImageUrlr = animalImage.find(k=>k.animal === args[1])
      var animalFactUrlr = animalFact.find(k=>k.animal === args[1])
      if(!animalFactUrlr || !animalImageUrlr){
      message.reply(`Invalid animal!\nDOG\nCAT\nPANDA\nBIRD\nFOX\nKOALA`)
      return null;
      }
      var animalFactUrl = animalFactUrlr.api
      var animalImageUrl = animalImageUrlr.api
    }
    var animalFacte = await fetch(animalFactUrl).then(res => res.json()).then(json =>{
      return json.fact
    })
    var animalImagee = await fetch(animalImageUrl).then(res => res.json()).then(json =>{
      return json.link
    })
    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setTitle(animalFacte)
    .setImage(animalImagee)
    message.reply({embeds: [embed]})
  }
}