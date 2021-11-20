const Discord = require("discord.js")
module.exports = {
  triggers: ["avatar", "av"],
  description: "Display the ping of the bot to Discord.",
  usage: "avatar [@user || userID]",
  run: async function(client, message, db, config){
    const args = message.content.split(" ")
    let user = await resolveUser(message)
    if(!user)return message.channel.send("No way to identify user!")
    var img = user.displayAvatarURL({dynamic: true})

    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setImage(img)
    .setAuthor(user.tag, img, img)
    .setThumbnail(img)
    .setFooter(user.tag, img)
    message.channel.send({embeds: [embed]})

    async function resolveUser(message){
      if(message.mentions.users.first()){
        return message.mentions.users.first()
      } else if(args[1]){
        if(!args[1] || !parseInt(args[1]))return false
        let a = await message.guild.members.fetch(args[1])
        if(!a)return false
        return a.user
      } else{
        return message.author
      }
    }
  }
}