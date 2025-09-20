const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User1");

// POST /api/signup
router.post("/signup", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, mobile, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

module.exports = router;
