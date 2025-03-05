const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { Admin } = require("../models");
require("dotenv").config();

// Middleware to verify admin authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    if (decoded.role !== "admin" && decoded.role !== "sub-admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Admin registration route
router.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const newAdmin = await Admin.create({ email, password: hashedPassword, role: role || "admin" });

    res.status(201).json({ message: "✅ Admin registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, message: "✅ Admin logged in successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Password reset request
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    admin.resetToken = resetToken;
    admin.resetTokenExpires = Date.now() + 3600000; // 1 hour expiry
    await admin.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Password Reset Request",
      text: `Use this link to reset your password: http://localhost:5000/reset-password/${resetToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "✅ Password reset link sent to email!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reset password
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({ where: { resetToken: token, resetTokenExpires: { $gt: Date.now() } } });
    if (!admin) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash new password
    admin.password = await bcrypt.hash(newPassword, 10);
    admin.resetToken = null;
    admin.resetTokenExpires = null;
    await admin.save();

    res.status(200).json({ message: "✅ Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route example
router.get("/dashboard", authenticateAdmin, (req, res) => {
  res.status(200).json({ message: "✅ Welcome to the admin dashboard!" });
});

module.exports = router;
