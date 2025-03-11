const { clerkClient } = require("@clerk/clerk-sdk-node");
const db = require("../models");
const { User } = db;

const mergeUsers = async (req, res) => {
  try {
    const dbUsers = await User.findAll({
      attributes: ["id", "name", "email", "role", "createdAt"],
      raw: true,
    });

    const clerkUserList = await clerkClient.users.getUserList();
    const clerkUsers = Array.isArray(clerkUserList) ? clerkUserList : clerkUserList.data || [];

    const mergedUsers = [];

    dbUsers.forEach((dbUser) => {
      const clerkUser = clerkUsers.find(
        (cu) => cu.emailAddresses[0]?.emailAddress === dbUser.email
      );

      mergedUsers.push({
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        createdAt: dbUser.createdAt,
        dbId: dbUser.id,
        clerkId: clerkUser?.id || null,
        clerkStatus: clerkUser ? "✔️ In Clerk" : "❌ Not in Clerk",
      });
    });

    clerkUsers.forEach((clerkUser) => {
      const existsInDb = dbUsers.some(
        (dbUser) => dbUser.email === clerkUser.emailAddresses[0]?.emailAddress
      );

      if (!existsInDb) {
        mergedUsers.push({
          email: clerkUser.emailAddresses[0]?.emailAddress,
          name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
          role: clerkUser.publicMetadata?.role || "user",
          createdAt: clerkUser.createdAt,
          dbId: null,
          clerkId: clerkUser.id,
          clerkStatus: "✔️ In Clerk Only",
        });
      }
    });

    return res.status(200).json(mergedUsers);
  } catch (error) {
    console.error("❌ Error merging users:", error);
    res.status(500).json({ error: "Failed to fetch users." });
  }
};

module.exports = { mergeUsers };
