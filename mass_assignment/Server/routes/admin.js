const express = require('express');
const router = express.Router();
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/flag', authenticate, requireAdmin, (req, res) => {
  return res.status(200).json({
    message: `Welcome, ${req.user.name}. Here is your reward:`,
    flag: process.env.CTF_FLAG,
  });
});

// router.get('/users', authenticate, requireAdmin, async (req, res) => {
//   try {
//     const User = require('../models/User');
//     const users = await User.find({}).select('-password');
//     return res.status(200).json({ users });
//   } catch (err) {
//     console.error('[admin/users]', err.message);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// });

module.exports = router;
