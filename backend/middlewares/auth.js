// middlewares/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token faltando' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token inválido' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
