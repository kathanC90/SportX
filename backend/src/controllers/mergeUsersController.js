const { clerkClient } = require("@clerk/clerk-sdk-node");
const { User } = require("../models");

const mergeUsers = async (req, res) => {
  try {
    const dbUsers = await User.findAll();
    const clerkUsersResponse = await clerkClient.users.getUserList();
    const clerkUsers = clerkUsersResponse?.data || [];

    const dbClerkIds = dbUsers.map((u) => u.clerkId);
    const newSyncedUsers = [];

    for (const clerkUser of clerkUsers) {
      const { id: clerkId, emailAddresses, firstName, lastName, imageUrl } = clerkUser;
      const email = emailAddresses?.[0]?.emailAddress || null;
      const name = `${firstName || ""} ${lastName || ""}`.trim();
      const profileImage = imageUrl;

      if (!dbClerkIds.includes(clerkId)) {
        const newUser = await User.create({
          name: name || "No Name",
          email,
          role: "user",
          clerkId,
          profileImage: profileImage || undefined,
        });
        newSyncedUsers.push(newUser);
      }
    }

    const updatedDbUsers = await User.findAll();

    const mergedUsers = updatedDbUsers.map((dbUser) => {
      const clerkUser = clerkUsers.find((cu) => cu.id === dbUser.clerkId);
      return {
        id: dbUser.id,
        name: `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || dbUser.name,
        email: clerkUser?.emailAddresses?.[0]?.emailAddress || dbUser.email,
        role: dbUser.role,
        clerkId: dbUser.clerkId,
        profileImage: clerkUser?.imageUrl || dbUser.profileImage,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
      };
    });

    res.status(200).json(mergedUsers);
  } catch (error) {
    console.error("Error merging Clerk and DB users:", error);
    res.status(500).json({ message: "Failed to merge users." });
  }
};

module.exports = { mergeUsers };
