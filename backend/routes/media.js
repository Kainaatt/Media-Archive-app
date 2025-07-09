const express = require('express');
const router = express.Router();
const multer = require('multer');
const Media = require('../models/media');

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Upload route
router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, type, category, description } = req.body;

  const newMedia = new Media({
    title,
    type,
    category,
    description,
    fileUrl: req.file.path
  });

  await newMedia.save();
  res.json({ success: true, media: newMedia });
});

// Search route
router.get('/search', async (req, res) => {
  const { query, type, category } = req.query;

  const filter = {
    ...(type && { type }),
    ...(category && { category }),
    ...(query && { title: new RegExp(query, 'i') })
  };

  const results = await Media.find(filter);
  res.json(results);
});


router.get('/all', async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
