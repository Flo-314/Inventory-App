var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let GenreSchema = new Schema(
  {
    name: {type: String, required: true, maxLength: 75},
    image: { type: Schema.Types.ObjectId, ref: "Image" },

}
);


// Virtual for URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);