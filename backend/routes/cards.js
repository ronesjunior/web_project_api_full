const router = require('express').Router();
const {
  getCards,
  createCard,
  delCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const auth = require('../models/middlewares/auth'); // depois do usuário já AUTENTICADO, o sistema verifica a permissão (AUTORIZAÇÃO) para o usuário acessar uma rota, acessar controllers...

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:cardId', auth, delCard);
router.put('/:cardId/likes', auth, likeCard);
router.delete('/:cardId/likes', auth, dislikeCard);

module.exports = router;
