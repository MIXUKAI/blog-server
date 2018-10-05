const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the shape of the documents within this strcture
const articleSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'guanine' },
  md_content: { type: String, default: ''},
  html_content: { type: String, default: '' },
  category: { type: String, },
  tags: { type: Array, default: [] },
  hidden: { type: Boolean, default: false },
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  cover: String,
  source_link: String,
  comments: [{ body: String, date: Date }]
});

exports.Article = mongoose.model('Article', articleSchema);
