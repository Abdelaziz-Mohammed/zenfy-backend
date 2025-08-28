const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./src/models/admin.model.js");

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const existing = await Admin.findOne({ role: "super_admin" });
    if (existing) {
      console.log("⚠️ Super admin already exists:", existing.email);
      process.exit(0);
    }

    const superAdmin = new Admin({
      name: "Abdelaziz Mohamed",
      email: "abdelazizmo2022@gmail.com",
      password: "superadmin123",
      role: "super_admin",
      isActive: true,
    });

    await superAdmin.save();
    console.log("🎉 Super admin created:", superAdmin.email);

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding super admin:", err);
    process.exit(1);
  }
};

seedSuperAdmin();
