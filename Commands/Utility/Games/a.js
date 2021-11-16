module.exports = {
    triggers: ["a"],
    description: "Display the ping of the bot to Discord.",
    usage: "a",
    run: async function(client, message, db){
      let sentTime = message.createdTimestamp
      let m = await message.channel.send("Pinging...")
      let receivedTime = m.createdTimestamp
      m.edit(`Ping: ${receivedTime-sentTime}ms!`)
    }
  }