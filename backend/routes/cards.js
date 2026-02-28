const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const auth = require('../models/middlewares/auth'); // depois do usuário já AUTENTICADO, o sistema verifica a permissão (AUTORIZAÇÃO) para o usuário acessar uma rota, acessar controllers...

const {
  validateCreateCard,
  validateCardId,
} = require('../models/middlewares/validation.middleware');

router.get('/', auth, getCards);
router.post('/', auth, validateCreateCard, createCard);
router.delete('/:cardId', auth, validateCardId, deleteCard);
router.put('/:cardId/likes', auth, validateCardId, likeCard);
router.delete('/:cardId/likes', auth, validateCardId, dislikeCard);

module.exports = router;
