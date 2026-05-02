const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('name email');

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // isAdmin is sourced from the signed token only — never from the DB response
    req.user = {
      _id:     user._id,
      name:    user.name,
      email:   user.email,
      isAdmin: decoded.isAdmin === true,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Must be used after authenticate — checks isAdmin from the JWT payload
const requireAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
};

module.exports = { authenticate, requireAdmin };