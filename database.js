exports.db = class Database {
    constructor(filename) {
      this.filename = filename;
      this.data = require(filename);
    }
    saveData() {
      var fs = require("fs");
      fs.writeFile(this.filename, JSON.stringify(this.data), function() {
        null;
      });
    }
  }