const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username or email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

// Login using Passport Local
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {

        if (err) {
            return res.status(500).json({
                message: "Server error"
            });
        }

        if (!user) {
            return res.status(401).json({
                message: info.message
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Login failed"
                });
            }

            res.status(200).json({
                message: "Login successful",
                user: {
                    username: user.username,
                    email: user.email
                }
            });
        });

    })(req, res, next);
});

module.exports = router;