const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // serve static files

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const mediaRoutes = require('./routes/media');
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('🎉 Backend is working!');
});
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


