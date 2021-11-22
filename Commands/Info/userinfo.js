require("colors")
const pretty = require("pretty-ms")
const Discord = require("discord.js")
module.exports = {
  triggers: ["userinfo", "user-info"],
  description: "Display information about a user",
  usage: "userinfo [@user || userID]",
  run: async function(client, message, db, config){
    const args = message.content.split(" ")
    let user = await resolveUser(message)
    if(!user)return message.channel.send("No way to identify user!")
    var img = user.displayAvatarURL({dynamic: true})

    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setAuthor(user.user.tag, img, img)
    .setDescription(`Account creation date: ${new Date(user.user.createdTimestamp)} **(${pretty(Date.now() - user.user.createdTimestamp)} ago)**`)
    .setThumbnail(img)
    .setFooter(user.id, img)
    message.channel.send({embeds: [embed]})

    async function resolveUser(message){
      if(message.mentions.members.first() && !args[0].includes(client.user.id)){
        return message.mentions.members.first()
      }else if(message.mentions.members.first() && (args[0].includes(client.user.id) && message.mentions.members.toJSON()[1])){
      return message.mentions.members.toJSON()[1]
      } else if(!args[0].includes(client.user.id) && args[1]){
        if(!args[1] || !parseInt(args[1]))return false
        let a = await message.guild.members.fetch(args[1])
        if(!a)return false
        return a
      } else if(args[0].includes(client.user.id) && args[2]){
        if(!args[2] || !parseInt(args[2]))return false
        let a = await message.guild.members.fetch(args[2])
        if(!a)return false
        return a
      }else{
        return message.member
      }
    }
  }
}