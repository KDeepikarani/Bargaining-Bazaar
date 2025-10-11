/*
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

*/


// server/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// GET: all chats for a product (we will filter on client for private pair)
router.get("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const chats = await Chat.find({ productId }).sort({ createdAt: 1 });
    res.status(200).json(chats);
  } catch (err) {
    console.error("Fetch chats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST: create chat message (used as backup/save when sending)
router.post("/", async (req, res) => {
  try {
    const { productId, userName, sender, message, senderEmail, sellerEmail } = req.body;
    if (!productId || !userName || !sender || !message || !senderEmail || !sellerEmail) {
      return res.status(400).json({ message: "All fields required" });
    }
    const chat = new Chat({ productId, userName, sender, message, senderEmail, sellerEmail });
    await chat.save();
    res.status(201).json(chat);
  } catch (err) {
    console.error("Create chat error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
