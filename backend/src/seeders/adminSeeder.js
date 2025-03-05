"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    // Check if admin already exists
    const existingAdmins = await queryInterface.sequelize.query(
      `SELECT * FROM "Admins" WHERE email = 'admin@sportx.com';`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (existingAdmins.length === 0) {
      // If no admin exists, create one
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await queryInterface.bulkInsert("Admins", [
        {
          email: "admin@sportx.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    } else {
      console.log("✅ Admin already exists. Skipping seeding.");
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", { email: "admin@sportx.com" }, {});
  },
};
