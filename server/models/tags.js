const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true }
});

exports.Tag = mongoose.model('Tag', TagSchema);
