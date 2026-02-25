const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

/* ========================
   VALIDADOR DE URL
======================== */
const ValidatorUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

/* ========================
   AUTH
======================== */
module.exports.ValidateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.ValidateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(ValidatorUrl),
  }),
});

/* ========================
   CARDS
======================== */

// Criar card
module.exports.ValidateCreateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().custom(ValidatorUrl),
  }),
});

// Validar ID do card
module.exports.ValidateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
});

// Validar Update do perfil
module.exports.ValidateUpdateMe = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    })
    .required(),
});

// Validar Update foto do avatar
module.exports.ValidateUpdateAvatar = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().required().custom(ValidatorUrl),
    })
    .required(),
});
