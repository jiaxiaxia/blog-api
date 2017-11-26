const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: { type: Object },
  article_id: { type: Schema.Types.ObjectId, require: true },
  comment_title: { type: String },
  praise: { type: Number, default: 0 },
  contents: { type: String, required: true },
  createdTime: { type: Date, default: Date.now },
  updateTime: { type: Date, default: Date.now },
}, { versionKey: false });

export default mongoose.model('Comment', CommentSchema);
