const Discord = require("discord.js")
const ud = require('urban-dictionary')
module.exports = {
  triggers: ["urban"],
  description: "Search the definition of the word provided on urban dictionary",
  usage: "urban <word>",
  run: async function(client, message, db, config, args){
    var args0 = args.slice(1).join(" ")
    if(!message.channel.nsfw)return message.reply("This command must be run in an NSFW channel!")
ud.define(args0).then((results) => {
          var meaningsEnabler = 0
          var newmessage = ``
          var lengthOfJson = 3
          while (lengthOfJson > meaningsEnabler) {
            newmessage = `${newmessage}\n**Word Meaning:** ${results[meaningsEnabler].definition}\n**Example:** ${results[meaningsEnabler].example}\n\n`
            meaningsEnabler = meaningsEnabler + 1
          }
          const embed = new Discord.MessageEmbed()
            .setColor(config.embed_colour)
            .setAuthor(args0, null, results[0].permalink)
            .setTimestamp()
            .setFooter(`Urban dictionary meaning of ${args0}`)
            .setDescription(newmessage)
          message.reply({embeds: [embed]});
}).catch((error) => {
  const deniedEmbed = new Discord.MessageEmbed()
            .setColor(config.fail_embed_colour)
            .setAuthor(args0)
            .setTitle(error.toString())
          message.reply({embeds: [deniedEmbed]})
})
  }
}