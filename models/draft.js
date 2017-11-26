const moment = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function formatDate(v) {
  return new moment(String(v)).format('YYYY-MM-DD HH:mm:ss')
}

const DraftSchema = new Schema({
  title: { type: String, required: true },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    default: []
  }],
  createTime: {
    default: Date.now,
    type: Date,
    get: formatDate
  },
  lastEditTime: {
    type: Date,
    default: Date.now,
    get: formatDate
  },
  excerpt: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    default: null
  },
  draftPublished: Boolean
}, {
  toObject: {
    transform: function(doc, ret, game) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    },
    getters: true
  },
  toJSON: {
    transform: function(doc, ret, game) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v

    },
    getters: true
  }
});
// DraftSchema.set('toObject', { getters: true, virtuals: true });
const Draft = mongoose.model('Draft', DraftSchema);
module.exports = Draft
