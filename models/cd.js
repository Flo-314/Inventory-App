var mongoose = require("mongoose");

var Schema = mongoose.Schema;
require("dotenv").config();

let CdSchema = new Schema({
  title: { type: String, required: true, maxLength: 75 },
  author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  description: { type: String },
  price: { type: Number },
  stock: { type: Number },
  genre: [{ type: Schema.ObjectId, ref: "Genre" }],
});
CdSchema.virtual("url").get(function () {
  return "/catalog/cd/" + this._id;
});

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

//Export model
module.exports = mongoose.model("Cd", CdSchema);
module.exports.connection = dbConnection