const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Yetkisiz işlem.' });
  }
  next();
};

module.exports = adminMiddleware;