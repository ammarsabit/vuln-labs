const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verifies the JWT and attaches the user document to req.user
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    console.log(process.env.JWT_SECRET)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    console.log(user, process.env.JWT_SECRET);

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token', err});
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };
