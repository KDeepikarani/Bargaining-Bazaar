/* const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  productId: String,
  senderId: String,   // customer or seller
  receiverId: String, // customer or seller
  message: String,
  type: { type: String, default: "text" }, // text or system messages (like "Price agreed")
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
 *//*
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    userName: { type: String, required: true },
    message: { type: String, required: true },
    sender: { type: String, enum: ['customer','seller'], default: 'customer' },
    accepted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
*/

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  productId: { type: String, required: true },   // safer as string
  message: { type: String, required: true },
  userName: { type: String, required: true },
  sender: { type: String, enum: ["customer", "seller"], required: true },
  sellerAccepted: { type: Boolean, default: false },
  customerAccepted: { type: Boolean, default: false },
  dealFinalized: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);
