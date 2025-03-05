const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded." });
  }

  res.json({
    success: true,
    imageUrl: `/uploads/${req.file.filename}`,
    message: "✅ Image uploaded successfully!",
  });
});

module.exports = router;
