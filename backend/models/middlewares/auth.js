const jwt = require('jsonwebtoken');

// Proteção da API com autorização

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new Error('Token não fornecido');
    err.statusCode = 401;
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    const err = new Error('Token inválido');
    err.statusCode = 401;
    return next(err);
  }
};
