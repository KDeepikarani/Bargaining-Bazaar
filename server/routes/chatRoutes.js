/*const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Send a message
router.post('/send', async (req, res) => {
    try {
        const { productId, userName, message, sender } = req.body;
        const chat = new Chat({ productId, userName, message, sender });
        await chat.save();
        res.json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Accept/agree a message
router.post('/accept', async (req, res) => {
    try {
        const { chatId } = req.body;
        const chat = await Chat.findById(chatId);
        chat.accepted = true;
        await chat.save();
        res.json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get messages by product
router.get('/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const chats = await Chat.find({ productId }).sort({ createdAt: 1 });
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
*/

const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const nodemailer = require('nodemailer');

// ✅ Send message and notify seller
router.post('/send-message', async (req, res) => {
  try {
    const { productId, userId, sellerId, message, from, userEmail, sellerEmail } = req.body;

    let chat = await Chat.findOne({ productId, userId, sellerId });
    if (!chat) {
      chat = new Chat({ productId, userId, sellerId, messages: [] });
    }

    chat.messages.push({ from, message });
    await chat.save();

    // ✅ Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: sellerEmail,
      subject: 'New Bargain Message!',
      text: `You received a new message from ${from}: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email error:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
