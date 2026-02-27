const jwt = require('jsonwebtoken');

// Proteção da API com autorização

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Não autorizado' });
  }

  const token = authorization.replace('Bearer ', '');

  // 🔹 Token vazio (ex: "Bearer ")
  if (!token) {
    return res.status(401).send({ message: 'Token inválido' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
  } catch (err) {
    return res.status(401).send({ message: 'Token inválido ou expirado' });
  }

  next();
};
