const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  cate_name: { type: String, default: "" },                         // 文章类别
  cate_info: { type: String, default: "" },                         // 类别简述
  createdAt: { type: Date, default: Date.now },
},{ versionKey: false },{toObject:{}});

export default mongoose.model('Category', CategorySchema);
