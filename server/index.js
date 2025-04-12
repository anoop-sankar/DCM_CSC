// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Connection error', err));

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
  });
// Sample route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
