const router = require('express').Router();

const {
  login,
  createUser,
  getUser,
  idUser,
  delUser,
  updateMe,
  updateAvatar,
} = require('../controllers/users');

const {
  validateLogin,
  validateSignup,
  validateUpdateMe,
  validateUpdateAvatar,
} = require('../models/middlewares/validation.middleware');

const auth = require('../models/middlewares/auth'); // depois do usuário já AUTENTICADO, o sistema verifica a permissão (AUTORIZAÇÃO) para o usuário acessar uma rota, acessar controllers...

router.get('/crash-test', () => {
  console.log('>>> crash-test chamado');
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
}); // tem que testar usando a porta do backend/users/crash-test

router.post('/signin', validateLogin, login); // Rota pública sem autorização
router.post('/signup', validateSignup, createUser); // Rota pública sem autorização

router.get('/me', auth, getUser); // Rota com proteção da API com autorização
router.get('/:id', auth, idUser); // Rota com proteção da API com autorização
router.delete('/me', auth, delUser); // Rota com proteção da API com autorização
router.patch('/me', auth, validateUpdateMe, updateMe); // Rota com proteção da API com autorização
router.patch('/me/avatar', auth, validateUpdateAvatar, updateAvatar); // Rota com proteção da API com autorização

module.exports = router;
