const Card = require('../models/card');
const ERROR_CODE = 400;
const DOCUMENT_NOTFOUND = 404;
const ERROR_GENERAL = 500;

module.exports.getCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(ERROR_CODE)
          .send({ message: 'Dados inválidos para criação do card' });
      }
      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.delCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      // ✅ só o dono pode excluir
      if (String(card.owner) !== String(req.user._id)) {
        return res.status(403).send({
          message: 'Você não tem permissão para excluir este card',
        });
      }

      return Card.findByIdAndDelete(cardId).then(() =>
        res.send({ message: 'Card removido com sucesso' }),
      );
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'ID inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(404).send({ message: 'Card não encontrado' });
      }
      return next(err); // deixa seu errorMiddleware tratar 500
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE).send({ message: 'Card não encontrado' });
      }
      res.status(ERROR_GENERAL).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_CODE).send({ message: 'Card não encontrado' });
      }
      res.status(ERROR_GENERAL).send({ message: err.message });
    });
};
