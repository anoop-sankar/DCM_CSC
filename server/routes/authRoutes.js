// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthUser = require('../model/authUsermodel');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthUser.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Create
router.post('/register', async (req, res) => {
  try {
    const user = await AuthUser.create(req.body);
    res.status(201).json({
        message: "User created successfully",
        user: user
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
