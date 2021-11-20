const Discord = require("discord.js")
module.exports = {
  triggers: ["kick", "k"],
  description: "Kick a member",
  usage: "kick <@member || id>",
  run: async function(client, message, db){
    let perms = message.member.permissions
    let member = message.member
    let user = message.author
    let deathMem = await resolveMember(message)
    if(!perms.has("KICK_MEMBERS"))return message.channel.send("You require the kick members permission to run this command!")
    if(!deathMem)return message.channel.send("No way to identify user(s)!")
    


    async function resolveMember(message){
      let die = []
      let cannotDie = []
      let hadErrors = []
      let member = message.member
      if(message.mentions.members.first()){
        for(var i = 0;i<message.mentions.members.toJSON().length;i++){
          let deathCheck = message.mentions.members.toJSON()[i]
          if(Discord.Role.comparePositions(member.roles.highest, deathCheck) > 0){
            die.push(deathCheck)
          }else{
            cannotDie.push(deathCheck)
          }
        }
      }
      let parsedId = message.content.split(">")
      parsedId.splice(0, 1)
      console.log(parsedId)
      for(var i = 0;i<parsedId.length;i++){
        if(parsedId[i].includes("@")){
          parsedId[i].split("<")
          console.log(parsedId)
        }
      }
      for(var i = 0;i<parsedId.length;i++){
        if(parsedId === ""){
          parsedId.splice(i, 1)
          console.log(parsedId)
        } else if(parsedId[i].includes("@")){
          parsedId.splice(i, 1)
          console.log(parsedId)
        } else if(parsedId[i].includes(" ")){
          parsedId[i].replace(" ", "")
          console.log(parsedId)
        }
      }
      console.log(parsedId)
    }

    async function resolveReason(message){
      if(false)return
    }
  }
}