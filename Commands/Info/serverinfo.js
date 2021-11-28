const Discord = require("discord.js")
const pretty = require("pretty-ms")
module.exports = {
  triggers: ["serverinfo", "server-info"],
  description: "Display the information of the current server.",
  usage: "serverinfo",
  run: async function(client, message, db, config){
    let guild = message.guild
    let name = guild.name
    let mfaLevel = guild.mfaLevel
    let members = guild.memberCount.toString()
    let afkChannel = guild.afkChannel
    let afkTimeout = guild.afkTimeout
    let banner = guild.bannerURL({dynamic: true})
    let icon = guild.iconURL({dynamic: true})
    let roles = guild.roles.cache.toJSON()
    let channels = guild.channels.cache.toJSON()
    let creationDate = guild.createdAt
    let emojis = guild.emojis.cache.toJSON()
    let boosts = guild.premiumSubscriptionCount.toString()
    let boostLevel = guild.premiumTier
    let owner = await guild.fetchOwner()
    const embed = new Discord.MessageEmbed()
    .setColor(config.embed_colour)
    .setAuthor(name, icon, icon)
    .setTitle("Owner: " + owner.user.tag)
    .addField("Created At:",creationDate.toString() + " **(" + pretty(Date.now()-guild.createdTimestamp) + " ago)**")
    .addField("Members:",members)
    .setThumbnail(icon)
    .addField("Boosts:", boosts + " *(" + boostLevel + ")*")
    .setFooter("Image is banner, thumbnail/author/footer is icon.", icon)
    .addField("Role Count:",roles.length.toString())
    .addField("Channel Count:", channels.length.toString())
    .addField("Emoji Count:", emojis.length.toString())
    if(afkChannel)embed.addField("Afk Channel:",afkChannel.name)
    if(afkTimeout)embed.addField("Afk Timeout:",pretty(afkTimeout))
    if(banner)embed.setImage(banner)
    message.reply({embeds: [embed]})
  }
}