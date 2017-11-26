const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: String,
  visits: {
	type: Number,
	default: 0
  },
  tags: [{
	type: Schema.Types.ObjectId,
	ref: 'tag'
  }],
  createTime: {
	type: Date
  },
  lastEditTime: {
	type: Date,
	default: Date.now
  },
  hidden: Boolean,
  excerpt: String,
  content: String,
  comments: [{
	type: Schema.Types.ObjectId,
	ref: 'Comment'
  }]
}, { versionKey: false });

export default mongoose.model('Article', ArticleSchema);
