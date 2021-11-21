//Requirements and logging in
const Discord = require("discord.js");
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES
] });
const setup = require("./setup.js")
client.login(setup.public.token)
const { readdirSync } = require("fs");
const { join } = require("path");
const database = new require("./database.js").db
const colors = require('colors');
/////////////////////////////////////////////////////
console.log("OS:".brightYellow.bold +process.platform.brightYellow.bold)
client.on("ready", ()=>{
  console.log(("Logged in as " + client.user.tag + " at:\n" + new Date(Date.now()).toString()).rainbow.bold.underline.bgBlack)
})
/////////////////////////////////////////////////////
const comfolders = readdirSync(join(__dirname, "Commands")).filter((file) =>
  !file.endsWith(".js")
);


console.log("Loading commands...".red)
const files = []
for(var i = 0;i<comfolders.length;i++){
  let js = {
    "dir": comfolders[i],
    "files": readdirSync(__dirname + "/Commands/" + comfolders[i]).filter(file=>file.endsWith(".js"))
  }
  files.push(js)
}
client.commands = []
for(var i = 0;i<files.length;i++){
  for(var ii = 0;ii<files[i].files.length;ii++){
    try{
      console.log(("Loading file " + __dirname+ "/Commands/" + files[i].dir + "/" + files[i].files[ii]).blue)
    let d = require("./" + "Commands/" + files[i].dir + "/" + files[i].files[ii])
  let js = {
    triggers: d.triggers,
    run: d.run,
    description: d.description,
    usage: d.usage
  }
  client.commands.push(js)
    } catch(err){
      console.log(err)
    }
  }
}
var count = 0
files.forEach((data, index)=>{
  count += data.files.length
})
console.log((client.commands.length + "/" + count + " Commands Loaded!").italic.underline.green.bold.bgBrightGreen)
client.on("messageCreate", async message =>{
  if(message.author.bot)return;
  require("./Events/message.js").run(client, message, database, setup.public)
})
