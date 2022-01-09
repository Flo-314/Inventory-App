var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let CdSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 75},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    description: {type: Date},
    price: {type: Date},
    url:{type: Number},
    stock:{ type: Number},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre', required: true},
}
);


// Virtual for URL
CdSchema
.virtual('url')
.get(function () {
  return '/catalog/cd/' + this._id;
});

//Export model
module.exports = mongoose.model('Cd', CdSchema);