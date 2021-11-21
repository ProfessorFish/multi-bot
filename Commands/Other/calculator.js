const Discord = require("discord.js")
module.exports = {
  triggers: ["calculate", "calculator", "maths", "math"],
  description: "Do a maths equation.",
  usage: "calculate <thing to calculate>",
  run: async function(client, message, db, config){
    const args = message.content.toLowerCase().split(" ")
    args.splice(0,1)
    let maths = args.join("")
    console.log(3^3)
    console.log(maths)
    try{
      function calc(fn) {
  return new Function('return ' + fn)();
}
      let answer = calc(maths)
      const embed = new Discord.MessageEmbed()
      .setColor(config.success_embed_colour)
      .setTitle(answer.toString())
      .setFooter("Powers may not work")
      message.channel.send({embeds: [embed]})
    } catch(err){
      message.channel.send("Maths went wrong!\n\n" + err)
    }
  }
}