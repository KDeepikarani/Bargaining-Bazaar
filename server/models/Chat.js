/*
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  message: { type: String, required: true },
  userName: { type: String, required: true },
  sender: { type: String, enum: ["customer", "seller"], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
*/

// server/models/Chat.js
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String, required: true },
  senderEmail: { type: String, required: true },
  sellerEmail: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Chat", chatSchema);
