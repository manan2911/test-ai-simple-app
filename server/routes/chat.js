const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");
const authMiddleware = require("../middleware/auth");
const chatRateLimiter = require("../middleware/ratelimiter");
const  getAIResponse = require("../utils/ai");

// Fetch Chat History
router.get("/history", authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const chat = await Chat.findOne({ userId });

        if (chat) {
            res.json({ messages: chat.messages });
        } else {
            res.json({ messages: [] });
        }
    } catch (error) {
        console.error("Chat History Error:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});

// Send a Message (with rate limiting)
router.post("/send", authMiddleware, chatRateLimiter, async (req, res) => {
    try {
        const { text } = req.body;
        const userId = req.userId;

        let chat = await Chat.findOne({ userId });
        if (!chat) {
            chat = new Chat({ userId, messages: [] });
        }

        chat.messages.push({ sender: "user", text });
        const aiResponse = await getAIResponse(text);
        chat.messages.push({ sender: "ai", text: aiResponse });
        await chat.save();

        // Return only the latest user and AI messages
        const latestMessages = chat.messages.slice(-2);
        res.json({ messages: latestMessages });
    } catch (error) {
        console.error("Message Send Error:", error);
        res.status(500).json({ error: "Message sending failed" });
    }
});

module.exports = router;
