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
  ValidateUserId,
} = require('../models/middlewares/validation.middleware');

const auth = require('../models/middlewares/auth');

/* ========================
   TESTE DE CRASH
======================== */
router.get('/crash-test', () => {
  console.log('>>> crash-test chamado');
  setTimeout(() => {
    throw new Error('O servidor travará agora');
  }, 0);
});

/* ========================
   ROTAS PÚBLICAS
======================== */
router.post('/signin', ValidateLogin, login);
router.post('/signup', ValidateSignup, createUser);

/* ========================
   ROTAS PROTEGIDAS
======================== */

console.log('types:', {
  auth: typeof auth,
  ValidateUserId: typeof ValidateUserId,
  idUser: typeof idUser,
});
router.get('/me', auth, getUser);

router.get('/:id', auth, ValidateUserId, idUser);

router.delete('/me', auth, delUser);

router.patch('/me', auth, ValidateUpdateMe, updateMe);

router.patch('/me/avatar', auth, ValidateUpdateAvatar, updateAvatar);

module.exports = router;
