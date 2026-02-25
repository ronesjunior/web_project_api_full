const User = require('../models/user');
const ERROR_CODE = 400;
const DOCUMENT_NOTFOUND = 404;
const ERROR_GENERAL = 500;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário ou senha não encontrado!' });
      }

      return bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            return res
              .status(401)
              .send({ message: 'Usuário ou senha não encontrado!' });
          }
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
          });
          return res.status(200).send({ token });
        })
        .catch((error) => {
          console.log('Erro ao tentar fazer login:', error);
          return res.status(ERROR_GENERAL).send({ message: error.message });
        });
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        about,
        avatar,
        email,
        password: hash, // 👈 agora salva a senha criptografada
      });
    })
    .then((user) => {
      console.log('Usuário criado com sucesso:', user);
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log('Erro ao tentar criar o usuário:', err);
        return res
          .status(ERROR_CODE)
          .send({ message: 'Dados inválidos para criação do usuário' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.getUser = (req, res, next) => {
  const { _id: id } = req.user;

  User.findById(id)
    .select('-password')
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

module.exports.idUser = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(ERROR_CODE).send({ message: 'ID inválido' });
      }

      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário não encontrado' });
      }

      res.status(ERROR_GENERAL).send({ message: 'Erro interno do servidor' });
    });
};

module.exports.delUser = (req, res) => {
  const id = req.user._id;

  User.findByIdAndDelete(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return res
          .status(DOCUMENT_NOTFOUND)
          .send({ message: 'Usuário não encontrado' });
      }
      return res
        .status(ERROR_GENERAL)
        .send({ message: 'Erro interno do servidor' });
    });
};

module.exports.updateMe = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .select('-password')
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .select('-password')
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
