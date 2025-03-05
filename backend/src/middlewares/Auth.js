const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateAdmin = (allowedRoles = ["admin"]) => {
  return (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
      }

      const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

      // Check if the user has the required role
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token." });
    }
  };
};

module.exports = authenticateAdmin;
