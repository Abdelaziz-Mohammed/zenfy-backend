const express = require("express");
const { listAdmins, deleteAdmin, approveRequest, listPendingAdmins } = require("./../controllers/admin.controller");
const { superAdminMiddleware } = require("./../middlewares/superAdmin.middleware");

const adminRouter = express.Router();

// super_admin only
adminRouter.get("/", superAdminMiddleware, listAdmins);
adminRouter.delete("/:id", superAdminMiddleware, deleteAdmin);
adminRouter.put("/:id/approve", superAdminMiddleware, approveRequest);
adminRouter.get("/pending", superAdminMiddleware, listPendingAdmins);

module.exports = adminRouter;
