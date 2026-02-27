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
  ValidateCreateCard,
  ValidateCardId,
} = require('../models/middlewares/validation.middleware');

router.get('/', auth, getCards);
router.post('/', auth, ValidateCreateCard, createCard);
router.delete('/:cardId', auth, ValidateCardId, deleteCard);
router.put('/:cardId/likes', auth, ValidateCardId, likeCard);
router.delete('/:cardId/likes', auth, ValidateCardId, dislikeCard);

module.exports = router;
