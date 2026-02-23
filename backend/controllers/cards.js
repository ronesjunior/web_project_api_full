const Card = require('../models/card');
const ERROR_CODE = 400;
const DOCUMENT_NOTFOUND = 404;
const ERROR_GENERAL = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send(card))
    .catch((err) => {
      res
        .status(ERROR_GENERAL)
        .send({ message: 'Erro interno do servidor.Servidor parado!' });
    });
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

module.exports.delCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail()
    .then((card) => {
      // checa dono
      if (String(card.owner) !== String(req.user._id)) {
        return res
          .status(403)
          .send({ message: 'Você não pode deletar este card' });
      }

      return Card.findByIdAndDelete(cardId).then((deleted) =>
        res.send(deleted),
      );
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Card não encontrado' });
      }
      return res
        .status(ERROR_GENERAL)
        .send({ message: 'Erro interno do servidor' });
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
