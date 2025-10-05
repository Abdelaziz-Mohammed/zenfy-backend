const Admin = require("./../models/admin.model");
const bcrypt = require("bcryptjs");

// List all admins (super_admin only)
const listAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({ isPending: false }).select("-password"); // hide password
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete an admin (but not super_admin)
const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
      });
    }

    if (admin.role === "super_admin") {
      return res.status(403).json({
        message: "Cannot delete a super_admin",
      });
    }

    // Prevent deleting self
    if (req.user && req.user.id === id) {
      return res.status(400).json({
        message: "You cannot delete yourself",
      });
    }

    await Admin.findByIdAndDelete(id);
    res.json({
      message: "Admin deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Approve pending admin request (super_admin only)
const approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });
    if (!admin.isPending) {
      return res.status(400).json({ message: "Admin is already approved" });
    }

    admin.isPending = false;
    await admin.save();

    res.json({ message: "Admin approved successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reject pending admin request (super_admin only)
const rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    if (!admin) return res.status(404).json({ message: "Admin not found" });
    if (!admin.isPending) {
      return res.status(400).json({ message: "Admin is not pending" });
    }

    await Admin.findByIdAndDelete(id);
    res.json({ message: "Admin rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// List pending admins (super_admin only)
const listPendingAdmins = async (req, res) => {
  try {
    const pendingAdmins = await Admin.find({ isPending: true, isVerified: true }).select("-password");
    res.status(200).json(pendingAdmins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { listAdmins, deleteAdmin, approveRequest, rejectRequest, listPendingAdmins };
