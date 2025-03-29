const express = require("express");
const { clerkClient } = require("@clerk/clerk-sdk-node");
const { Pool } = require("pg");
const { v4: uuidv4 } = require("uuid");
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

router.post("/upload-image", uploadMiddleware.single("image"), uploadImage);
router.get("/", (req, res) => res.send("✅ Users API Working!"));

router.get("/merged", async (req, res) => {
  try {
    const { rows: dbUsers } = await pool.query('SELECT * FROM "Users"');
    const clerkUsersResponse = await clerkClient.users.getUserList();
    const clerkUsers = clerkUsersResponse?.data || [];
    
    const clerkUserMap = {};
    clerkUsers.forEach((user) => {
      const email = user.emailAddresses?.[0]?.emailAddress;
      if (email) clerkUserMap[email] = user;
    });
    
    const mergedUsers = [];
    for (const dbUser of dbUsers) {
      const clerkUser = clerkUserMap[dbUser.email];
      if (clerkUser && !dbUser.clerkId) {
        await pool.query('UPDATE "Users" SET "clerkId" = $1 WHERE "id" = $2', [clerkUser.id, dbUser.id]);
        dbUser.clerkId = clerkUser.id;
      }
      mergedUsers.push({
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        createdAt: dbUser.createdAt,
        clerkId: dbUser.clerkId || null,
        clerkStatus: dbUser.clerkId ? "✔️ Active in Clerk" : "❌ Not Found in Clerk",
      });
      delete clerkUserMap[dbUser.email];
    }
    
    await Promise.all(
      Object.values(clerkUserMap).map(async (clerkUser) => {
        const generatedUuid = uuidv4();
        const { rows } = await pool.query(
          `INSERT INTO "Users" (id, name, email, role, "clerkId", "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
           ON CONFLICT (email)
           DO UPDATE SET "clerkId" = EXCLUDED."clerkId", "updatedAt" = NOW()
           RETURNING *;`,
          [
            generatedUuid,
            `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
            clerkUser.emailAddresses?.[0]?.emailAddress,
            clerkUser.publicMetadata?.role || "user",
            clerkUser.id,
          ]
        );
        if (rows.length > 0) {
          mergedUsers.push({
            id: rows[0].id,
            email: rows[0].email,
            name: rows[0].name,
            role: rows[0].role,
            createdAt: rows[0].createdAt,
            clerkId: rows[0].clerkId,
            clerkStatus: "✔️ Automatically Added",
          });
        }
      })
    );
    res.status(200).json(mergedUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch merged users." });
  }
});

router.put("/toggle-role/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  if (!userId || !role) return res.status(400).json({ error: "User ID and role are required" });
  try {
    const { rows } = await pool.query('UPDATE "Users" SET "role" = $1 WHERE "id" = $2 RETURNING *', [role, userId]);
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    if (rows[0].clerkId) {
      await clerkClient.users.updateUser(rows[0].clerkId, { publicMetadata: { role } });
    }
    res.status(200).json({ message: "✅ Role updated successfully", user: rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update role." });
  }
});

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM "Users" WHERE id = $1', [userId]);
    if (!rows.length) return res.status(404).json({ error: "User not found" });
    const user = rows[0];
    if (user.clerkId) {
      await clerkClient.users.deleteUser(user.clerkId);
    }
    await pool.query('DELETE FROM "Users" WHERE id = $1', [userId]);
    const { rows: updatedUsers } = await pool.query('SELECT * FROM "Users"');
    res.status(200).json({ message: "✅ User deleted successfully", users: updatedUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user." });
  }
});

module.exports = router;
