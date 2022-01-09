var mongoose = require("mongoose");
require("dotenv").config();


//connect to dataBase
const dbConnection = async () => {
  try {
    const uri = process.env.ATLAS;
    mongoose.connect(uri, { useNewUrlParser: true });
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("Connected Database Successfully");
    });
  } catch (err) {
    console.log(err);
  }
};
exports.connection = dbConnection