const Contact = require("../models/Contact");

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMsg = new Contact({ name, email, message });
    await newMsg.save();
    res.status(201).json({ message: "Message received" });
  } catch (err) {
    res.status(500).json({ error: "Message send failed" });
  }
};
