const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['photo','audio', 'video', 'text'], required: true },
  description: String,
  fileUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', mediaSchema);
