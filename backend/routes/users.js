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
  ValidateLogin,
  ValidateSignup,
  ValidateUpdateMe,
  ValidateUpdateAvatar,
} = require('../models/middlewares/validation.middleware');

const auth = require('../models/middlewares/auth'); // depois do usuário já AUTENTICADO, o sistema verifica a permissão (AUTORIZAÇÃO) para o usuário acessar uma rota, acessar controllers...

router.get('/crash-test', () => {
  console.log('>>> crash-test chamado');
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
}); // tem que testar usando a porta do backend/users/crash-test

router.post('/signin', ValidateLogin, login); // Rota pública sem autorização
router.post('/signup', ValidateSignup, createUser); // Rota pública sem autorização

router.get('/me', auth, getUser); // Rota com proteção da API com autorização
router.get('/:id', auth, idUser); // Rota com proteção da API com autorização
router.delete('/me', auth, delUser); // Rota com proteção da API com autorização
router.patch('/me', auth, ValidateUpdateMe, updateMe); // Rota com proteção da API com autorização
router.patch('/me/avatar', auth, ValidateUpdateAvatar, updateAvatar); // Rota com proteção da API com autorização

module.exports = router;
