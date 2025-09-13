const { verifyToken } = require("./auth.middleware");

// Middleware to allow only super_admin
const superAdminMiddleware = [
  verifyToken, // first verify JWT token
  (req, res, next) => {
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ message: "Forbidden: super_admins only" });
    }
    next();
  },
];

module.exports = { superAdminMiddleware };
