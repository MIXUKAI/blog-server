const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the shape of the documents within this strcture
const articleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  content: { type: String, default: ''}, // body about markdown
  article_type: { type: String, required: true },  // translation, Original, Reproduced
  category: { type: String, }, // tec, life, Impression etc.
  hidden: { type: Boolean, default: false }, 
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  banner: String,
  source_link: String,
  comments: [{ body: String, date: Date }]
});

export default mongoose.model('Article', articleSchema);