const Discord = require("discord.js")
module.exports = {
  triggers: ["shutdown"],
  description: "Shutdowns the bot. (OWNER ONLY)",
  usage: "shutdown",
  run: async function(client, message, db, config){
    if(config.owner.find(k=> k.id === message.author.id))return message.channel.send("Only the bot owner(s) can run this command!")
    try{
      var m = await message.channel.send("Goodbye, o7.")
      client.destroy()
    } catch(err){
      message.channel.send("Could not destroy client!\nThrowing error to crash bot instead!")
      throw new Error("Goodbye, o7")
    }
  }
}