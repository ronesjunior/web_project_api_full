const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const auth = require('../models/middlewares/auth');

const {
  ValidateCreateCard,
  ValidateCardId,
} = require('../models/middlewares/validation.middleware');

// 🔐 Todas rotas protegidas
router.get('/', auth, getCards);

router.post('/', auth, ValidateCreateCard, createCard);

router.delete('/:cardId', auth, ValidateCardId, deleteCard);

router.put('/:cardId/likes', auth, ValidateCardId, likeCard);

router.delete('/:cardId/likes', auth, ValidateCardId, dislikeCard);

module.exports = router;
