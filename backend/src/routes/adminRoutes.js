const express = require("express");
const router = express.Router();
const { ClerkExpressWithAuth } = require("@clerk/clerk-sdk-node");
const { Admin } = require("../models");
require("dotenv").config();

const authenticateAdmin = ClerkExpressWithAuth({
  jwtKey: process.env.CLERK_JWT_KEY,
  authorizedParties: [process.env.CLERK_AUTHORIZED_PARTY],
});

// Ensure admin exists in database and sync with Clerk
router.post("/ensure-admin", authenticateAdmin, async (req, res) => {
  try {
    const { userId, email, firstName, lastName } = req.auth.claims;

    let admin = await Admin.findOne({ where: { clerkUserId: userId } });

    if (!admin) {
      admin = await Admin.create({
        clerkUserId: userId,
        email,
        firstName,
        lastName,
        role: "admin",
      });
    } else {
      await Admin.update(
        { email, firstName, lastName },
        { where: { clerkUserId: userId } }
      );
    }

    res.status(200).json({ message: "✅ Admin verified!", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected admin dashboard route
router.get("/dashboard", authenticateAdmin, async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { clerkUserId: req.auth.claims.userId } });
    if (!admin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    res.status(200).json({ message: "✅ Welcome to the admin dashboard!", admin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
