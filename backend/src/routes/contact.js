const express = require("express");
const router = express.Router();
const { Contact } = require("../models");

// POST /api/contact
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save to DB
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    res.status(201).json({ message: "Contact saved successfully", contact });
  } catch (error) {
    console.error("❌ Error saving contact:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});

module.exports = router;
