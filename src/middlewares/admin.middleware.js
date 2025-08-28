const { verifyToken, authorize } = require("./auth.middleware");

const adminMiddleware = [verifyToken, authorize(["admin", "super_admin"])];

module.exports = { adminMiddleware };
