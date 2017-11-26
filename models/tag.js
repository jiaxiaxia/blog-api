const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: String
}, {
  toObject: {
    transform: function(doc, ret, game) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  },
  toJSON: {
    transform: function(doc, ret, game) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v

    }
  }
});
const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag
