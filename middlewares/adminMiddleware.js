const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Token’ı çözüyoruz
    req.user = decoded; // Kullanıcı bilgilerini req objesine koyuyoruz
    next(); // Bir sonraki işleme geç
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = authMiddleware;
