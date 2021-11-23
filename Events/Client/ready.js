module.exports = {
    run: async function(client){
      require("colors")
      console.log(("Logged in as " + client.user.tag + " at:\n" + new Date(Date.now()).toString()).rainbow.bold.underline.bgBlack)
    }
  }