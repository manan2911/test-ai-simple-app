const rateLimit = require("express-rate-limit");

// Limit each user to 5 messages per minute
const chatRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // Limit each user to 5 requests per minute
    message: {
        error: "Too many messages sent in a short time. Please wait a moment before trying again.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = chatRateLimiter;
