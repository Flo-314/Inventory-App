let mongoose = require("mongoose");
let Schema = mongoose.Schema;


var AuthorSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
  image: { type: Schema.Types.ObjectId, ref: "Image" },


});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

//Export model
module.exports = mongoose.model("Author", AuthorSchema);
