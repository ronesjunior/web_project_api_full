require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const cardRoute = require('./routes/cards.js');
const userRoute = require('./routes/users.js');
const errorMiddleware = require('../backend/models/middlewares/error.middleware');
const {
  requestLogger,
  errorLogger,
} = require('./models/middlewares/logger.middleware.js');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) =>
    console.log(`Erro ao tentar conectar ao banco de dados : ${error}`),
  );

app.use(express.json());

app.use(requestLogger);

app.use(cors());
app.options(/.*/, cors());

app.use('/users', userRoute);
app.use('/cards', cardRoute);

app.use(/.*/, (req, res) => {
  res.status(404).send({ message: 'Endereço de rota não foi encontrado' });
});

app.use(errorLogger);

app.use(errors());
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Servidor conectado na porta ${port}`);
});
