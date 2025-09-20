/*

const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

const Chat = require("./models/Chat");
const authRoutes = require("./routes/authRoutes");  // ✅ use authRoutes
const chatRoutes = require("./routes/chatRoutes");  // ✅ mounted below

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ------------------------
// MongoDB connection
// ------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------------
// Routes
// ------------------------
app.use("/api/auth", authRoutes);   // ✅ now handles /signup and /login
app.use("/api/chat", chatRoutes);   // ✅ mounted chat routes

// ------------------------
// Setup Nodemailer
// ------------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ------------------------
// Socket.IO setup
// ------------------------
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🔌 New connection:", socket.id);

  socket.on("joinRoom", (productId) => {
    socket.join(`product-${productId}`);
    console.log(`User joined room: product-${productId}`);
  });

  socket.on(
    "sendMessage",
    async ({ productId, message, userName, sender, userEmail, sellerEmail }) => {
      try {
        userName = userName || "Anonymous";
        sender = sender || "customer";

        // Save chat to DB
        const chat = new Chat({
          productId,
          message,
          userName,
          sender,
        });
        await chat.save();

        // ✅ Send email only if logged-in customer
        if (sender === "customer" && userEmail && userName !== "Anonymous") {
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: sellerEmail,
            subject: "New Bargain Message from Customer",
            text: `You have a new message from ${userName}: ${message}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Email error:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        }

        // ✅ Emit message to room
        io.to(`product-${productId}`).emit("newMessage", chat);
      } catch (err) {
        console.error("sendMessage error:", err);
      }
    }
  );

  socket.on("acceptMessage", async ({ chatId, productId, userType }) => {
    try {
      const chat = await Chat.findById(chatId);
      if (!chat) return;

      if (userType === "seller") chat.sellerAccepted = true;
      if (userType === "customer") chat.customerAccepted = true;

      if (chat.sellerAccepted && chat.customerAccepted)
        chat.dealFinalized = true;

      await chat.save();
      io.to(`product-${productId}`).emit("newMessage", chat);
    } catch (err) {
      console.error("acceptMessage error:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ------------------------
// Get chats by productId
// ------------------------
app.get("/api/chat/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const chats = await Chat.find({ productId }).sort({ createdAt: 1 });
    res.json(chats);
  } catch (err) {
    console.error("Fetch chat error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ------------------------
// Start the server
// ------------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
