const mongoose = require("mongoose");

class Connection {
  static async open() {
    mongoose.connect(
      `mongodb://${process.env.host}:${process.env.db_port}/${process.env.dbname}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("Connected successfully");
    });
  }
}

module.exports = { Connection };
