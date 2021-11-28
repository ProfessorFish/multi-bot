module.exports = {
  run: async function(client, message, db, settings){
    const args = message.content.toLowerCase().split(" ")
     if(message.mentions.users.first() && message.mentions.users.first().id === client.user.id && args[0].replace("<", "").replace(">", "").replace("@", "").replace("!", "") === client.user.id){
        let a = args[0]
        args.splice(0,1)
        args[0] = a + args[0]
     }
    let c = client.commands.find(k=> k.triggers.find(l=>(settings.default_prefix + l == args[0]) || (message.mentions.users.first() && message.mentions.users.first().id === client.user.id && l === args[0].split(">")[1])))
    if(c){
      c.run(client, message, db, settings, args)
    }
  }
}