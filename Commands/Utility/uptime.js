const pretty = require("pretty-ms")
module.exports = {
  triggers: ["uptime"],
  description: "Display the uptime of the bot.",
  usage: "uptime",
  run: async function(client, message, db, config, args){
    message.reply(`I have been online since:\n**${Date(Date.now()-client.uptime)}**\nWhich is:\n**${pretty(client.uptime)} ago**`)
  }
}