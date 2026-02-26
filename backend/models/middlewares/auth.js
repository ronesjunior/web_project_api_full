const jwt = require('jsonwebtoken');

// Proteção da API com autorização

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(403).send({ message: 'Não autorizado' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(403).send({ message: 'Não autorizado' });
  }
  req.user = payload;
  next();
};
