const Discord = require("discord.js")
module.exports = {
  triggers: ["rps", "rockpaperscissors", "rock-paper-scissors"],
  description: "Play a game of rock paper scissors against the bot!",
  usage: "rps",
  run: async function(client, message, db, config){
    const args = message.content.toLowerCase().split(" ")
    let choices = ["rock", "paper", "scissors"]
    let valid = ["rock", "paper"," scissors", "r", "p", "s","scissor", "rocks", "papers"]
    let rock = ["rock", "rocks", "r"]
    let scissors = ["scissor", "scissors", "s"]
    let paper = ["paper", "papers", "p"]
    if(!args[1])return message.channel.send("Please provide a valid choice!")
    if(!valid.find(k=> k === args[1]))return message.channel.send("Invalid choice! Must be one of: " + valid.join(", "))
    let mine = choices[Math.floor(Math.random() * choices.length)]
    if(rock.find(k=> k === args[1])){
      if(mine === "paper"){
        weWin(mine, "rock")
      } else if(mine === "rock"){
        tie(mine, "rock")
      } else if(mine === "scissors"){
        theyWin(mine, "rock")
      }
    } else if(paper.find(k=> k === args[1])){
      if(mine === "paper"){
        tie(mine, "paper")
      } else if(mine === "rock"){
        theyWin(mine, "paper")
      } else if(mine === "scissors"){
        weWin(mine, "paper")
      }
    } else if(scissors.find(k=> k === args[1])){
      if(mine === "paper"){
        theyWin(mine, "scissors")
      } else if(mine === "rock"){
        weWin(mine, "scissors")
      } else if(mine === "scissors"){
        tie(mine, "scissors")
      }
    }
    function weWin(mp, tp){
      const embed = new Discord.MessageEmbed()
      .setColor(config.fail_embed_colour)
      .setTitle("You lose!")
      .setDescription("I picked " + mp + ", you picked " + tp + " meaning I win!")
      .setFooter("This is pure random, I am not biased or rigged in any way")
      message.channel.send({embeds: [embed]})
    }
    function theyWin(mp, tp){
      const embed = new Discord.MessageEmbed()
      .setColor(config.success_embed_colour)
      .setTitle("You Win!")
      .setDescription("I picked " + mp + ", you picked " + tp + " meaning you win!")
      .setFooter("This is pure random, I am not biased or rigged in any way")
      message.channel.send({embeds: [embed]})
    }
    function tie(mp, tp){
      const embed = new Discord.MessageEmbed()
      .setColor(config.processing_embed_colour)
      .setTitle("Its a tie!")
      .setDescription("I picked " + mp + ", you picked " + tp + " meaning we tie!")
      .setFooter("This is pure random, I am not biased or rigged in any way")
      message.channel.send({embeds: [embed]})
    }
  }
}