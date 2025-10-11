const Admin = require("../models/admin.model");

const verifyEmail = async (req, res) => {
  try {
    const { token, email } = req.query;

    if (!token || !email) {
      return res.status(400).json({ success: false, message: "Token and email are required" });
    }

    const admin = await Admin.findOne({ email, verificationToken: token });

    if (!admin) {
      const alreadyVerified = await Admin.findOne({ email, isVerified: true });
      if (alreadyVerified) {
        return res.status(200).json({
          success: true,
          message: "Email already verified. You can log in.",
        });
      }
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    admin.isVerified = true;
    admin.verificationToken = null;
    admin.verificationExpiresAt = null; // clear the expiry field
    admin.isPending = true;
    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully. Please wait for admin approval.",
    });
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while verifying",
    });
  }
};

module.exports = { verifyEmail };
