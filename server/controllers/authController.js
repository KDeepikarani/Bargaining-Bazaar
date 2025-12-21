const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, mobile, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
 email = email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  //  res.status(200).json({ message: 'Login successful', user });
  res.status(200).json({
  message: "Login successful",
  user: {
    name: user.name,
    email: user.email,
    mobile: user.mobile
  }
});

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
