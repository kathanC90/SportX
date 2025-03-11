// src/models/index.js
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file !== "index.js" &&
      file.endsWith(".js") &&
      fs.statSync(path.join(__dirname, file)).isFile()
  )
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const modelFn = require(modelPath);

    if (typeof modelFn === "function") {
      const model = modelFn(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️ Skipping ${file} - does not export a model function`);
    }
  });

// Setup associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
