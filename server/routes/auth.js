const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if the username is taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // Create and save the new user
        const user = new User({ username, password });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Registration failed" });
    }
});

// User Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed" });
    }
});

// User Logout (Optional, handled on the frontend)
router.post("/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});
// Add this route at the end of auth.js

// Protected Route (for testing JWT middleware)
router.get("/protected", require("../middleware/auth"), (req, res) => {
    res.json({ message: "You have access to this protected route" });
});


module.exports = router;
