const Discord = require("discord.js")
module.exports = {
  triggers: ["avatar", "av"],
  description: "Display the ping of the bot to Discord.",
  usage: "avatar [@user || userID]",
  run: async function(client, message, db, config, args){
    let user = await resolveUser(message)
    if(!user)return message.reply("No way to identify user!")
    var img = user.displayAvatarURL({dynamic: true})

    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setImage(img)
    .setAuthor(user.tag, img, img)
    .setThumbnail(img)
    .setFooter(user.tag, img)
    message.reply({embeds: [embed]})

    async function resolveUser(message){
      if(message.mentions.users.first() && !args[0].includes(client.user.id)){
        return message.mentions.users.first()
      }else if(message.mentions.users.first() && (args[0].includes(client.user.id) && message.mentions.users.toJSON()[1])){
      return message.mentions.users.toJSON()[1]
      } else if(args[1]){
        if(!args[1] || !parseInt(args[1]))return false
        let a = await message.guild.members.fetch(args[1])
        if(!a)return false
        return a.user
      }else{
        return message.author
      }
    }
  }
}