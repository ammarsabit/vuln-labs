const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { authenticate } = require("../middleware/auth");

// ─────────────────────────────────────────────
// GET /api/users/profile
// Secure: returns own profile only
// ─────────────────────────────────────────────
router.get("/profile", authenticate, async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
      },
    });
  } catch (err) {
    console.error("[profile]", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/update_email", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    });
  } catch (err) {
    console.error("[update_email]", err);

    // 🔥 Handle duplicate email (unique index violation)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Email is already taken",
      });
    }

    // 🔥 Handle validation errors (invalid email format, etc.)
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

module.exports = router;
