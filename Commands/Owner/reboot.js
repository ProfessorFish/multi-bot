const Discord = require("discord.js")
require("colors")
module.exports = {
  triggers: ["reboot"],
  description: "Reboots the bot. (OWNER ONLY)",
  usage: "reboot",
  run: async function(client, message, db, config){
    if(config.owner.find(k=> k.id === message.author.id))return message.channel.send("Only the bot owner(s) can run this command!")
    try{
      var m = await message.channel.send("I'll see you on the other side :upside_down:")
      client.destroy()
    } catch(err){
      message.channel.send("Could not destroy client!\nThrowing error to crash bot instead!")
    }
    await client.login(config.token)
    message.channel.send("I'm back! Did you miss me?")
    console.log(("Logged in as " + client.user.tag + " at:\n" + new Date(Date.now()).toString()).rainbow.bold.underline.bgBlack)
  }
}