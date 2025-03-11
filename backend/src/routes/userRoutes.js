const express = require("express");
const { clerkClient } = require("@clerk/clerk-sdk-node");
const { Pool } = require("pg");
const { uploadImage } = require("../controllers/uploadController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const router = express.Router();
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sportx",
  password: "123456789",
  port: 5432,
});
router.post("/upload-image", uploadMiddleware.single('image'), uploadImage);
// ✅ Health check route
router.get("/", (req, res) => res.send("✅ Users API Working!"));

// ✅ Merge users from DB & Clerk + auto-insert if missing
router.get("/merged", async (req, res) => {
  try {
    // ✅ Fetch users from Database
    const { rows: dbUsers } = await pool.query('SELECT * FROM "Users"');

    // ✅ Fetch users from Clerk
    const clerkUsers = (await clerkClient.users.getUserList()).data;
    const clerkUserMap = Object.fromEntries(
      clerkUsers.map((user) => [
        user.emailAddresses[0]?.emailAddress,
        user,
      ])
    );

    const mergedUsers = [];

    // ✅ Merge users with auto-insert if missing
    for (const dbUser of dbUsers) {
      const clerkUser = clerkUserMap[dbUser.email];

      if (clerkUser && !dbUser.clerkId) {
        await pool.query(
          'UPDATE "Users" SET "clerkId" = $1 WHERE id = $2',
          [clerkUser.id, dbUser.id]
        );
        dbUser.clerkId = clerkUser.id;
      }

      mergedUsers.push({
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        createdAt: dbUser.createdAt,
        dbId: dbUser.id,
        clerkId: dbUser.clerkId || null,
        clerkStatus: dbUser.clerkId ? "✔️ Active in Clerk" : "❌ Not Found in Clerk",
      });

      delete clerkUserMap[dbUser.email];
    }

    // ✅ Insert missing Clerk users into Database
    for (const email in clerkUserMap) {
      const clerkUser = clerkUserMap[email];
      const { rows } = await pool.query(
        `
        INSERT INTO "Users" (name, email, role, "clerkId", "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *;
        `,
        [
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          email,
          clerkUser.publicMetadata?.role || "user",
          clerkUser.id,
        ]
      );

      mergedUsers.push({
        email,
        name: rows[0].name,
        role: rows[0].role,
        createdAt: rows[0].createdAt,
        dbId: rows[0].id,
        clerkId: clerkUser.id,
        clerkStatus: "✔️ Automatically Added",
      });
    }

    res.status(200).json(mergedUsers);
  } catch (error) {
    console.error("❌ Error merging users:", error);
    res.status(500).json({ error: "Failed to fetch merged users." });
  }
});

// ✅ Delete user from DB & Clerk
router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // ✅ Fetch user from DB
    const { rows } = await pool.query('SELECT * FROM "Users" WHERE id = $1', [
      userId,
    ]);

    if (!rows.length) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = rows[0];

    // ✅ Delete user from Clerk if exists
    if (user.clerkId) {
      await clerkClient.users.deleteUser(user.clerkId);
      console.log(`✅ Deleted from Clerk: ${user.clerkId}`);
    }

    // ✅ Delete user from Database
    await pool.query('DELETE FROM "Users" WHERE id = $1', [userId]);
    console.log(`✅ Deleted from Database: ${userId}`);

    // ✅ Fetch updated user list
    const { rows: updatedUsers } = await pool.query('SELECT * FROM "Users"');

    res.status(200).json({
      message: "✅ User deleted successfully",
      users: updatedUsers,
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user." });
  }
});

module.exports = router;
