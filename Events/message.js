module.exports = {
    run: async function(client, message, db, settings){
      const args = message.content.toLowerCase().split(" ")
      let c = client.commands.find(k=> k.triggers.find(l=>settings.default_prefix + l == args[0]))
      if(c){
        c.run(client, message, db)
      }
    }
  }