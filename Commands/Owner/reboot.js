const Discord = require("discord.js")
module.exports = {
  triggers: ["reboot"],
  description: "Reboots the bot. (OWNER ONLY)",
  usage: "reboot",
  run: async function(client, message, db, config){
    if(config.owner.find(k=> k.id === message.author.id))return message.reply("Only the bot owner(s) can run this command!")
    try{
      var m = await message.reply("I'll see you on the other side :upside_down:")
      client.destroy()
    } catch(err){
      message.reply("Could not destroy client!")
    }
    await client.login(config.token)
    message.reply("I'm back! Did you miss me?")
    console.log(("Logged in as " + client.user.tag + " at:\n" + new Date(Date.now()).toString()).rainbow.bold.underline.bgBlack)
  }
}