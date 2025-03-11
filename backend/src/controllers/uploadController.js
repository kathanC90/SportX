const cloudinary = require('../config/cloudinary');
const { Pool } = require('pg');
const streamifier = require('streamifier'); // ✅ Import this

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sportx",
  password: "123456789",
  port: 5432,
});

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // ✅ Stream the image buffer
    const uploadStream = cloudinary.uploader.upload_stream({
      resource_type: 'image',
      folder: 'profile_images'
    }, async (error, result) => {
      if (error) {
        console.error('Cloudinary Error:', error);
        return res.status(500).json({ error: 'Failed to upload image' });
      }

      // ✅ Update the image URL in PostgreSQL
      const { email } = req.body;
      const imageUrl = result.secure_url;

      const updateImageQuery = `
        UPDATE "Users"
        SET "profileImage" = $1
        WHERE "email" = $2
        RETURNING *;
      `;

      const { rows } = await pool.query(updateImageQuery, [imageUrl, email]);

      res.status(200).json({
        message: 'Image uploaded successfully',
        user: rows[0]
      });
    });

    // ✅ Pipe the buffer to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);

  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
