const fetch = require("node-fetch")
const Discord = require("discord.js")
module.exports = {
  triggers: ["define", "dictionary"],
  description: "Search the definition of the word provided",
  usage: "define <word>",
  run: async function(client, message, db, config){
    const args = message.content.toLowerCase().split(" ")
    var args0 = args.slice(1).join(" ")
    const args1 = args.slice(1).join("%20")
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${args1}`)
        .then(res => res.json())
        .then(json => {
          const deniedEmbed = new Discord.MessageEmbed()
            .setColor(config.embed_colour)
            .setAuthor(args0,
              null)
            .setTimestamp()
            .setTitle(`Could not find a defintion for ${args0}.`)
          if (json.title) return message.channel.send({embeds: [deniedEmbed]})
          var meaningsEnabler = 0
          var newmessage = ``
          var lengthOfJson = Object.keys(json[0].meanings).length
          while (lengthOfJson > meaningsEnabler) {
            newmessage = `${newmessage}\n**Word type:** ${json[0].meanings[meaningsEnabler].partOfSpeech}\n**Word Meaning:** ${json[0].meanings[meaningsEnabler].definitions[0].definition}\n**Example:** ${json[0].meanings[meaningsEnabler].definitions[0].example}\n`
            meaningsEnabler = meaningsEnabler + 1
          }
          const embed = new Discord.MessageEmbed()
            .setColor(config.embed_colour)
            .setAuthor(args0,
              null, "https://" + json[0].phonetics.find(k=> k.audio).audio)
            .setTimestamp()
            .setFooter(`Meaning of ${args0}`)
            .setTitle(json[0].phonetics[0].text)
            .setDescription(newmessage)
          message.channel.send({embeds: [embed]});
        })
  }
}