require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
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

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) =>
    console.log(`Erro ao tentar conectar ao banco de dados : ${error}`),
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

const allowedOrigins = [
  'https://web-project-api-full-flax.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // permite ferramentas/requests sem Origin (ex: Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS bloqueado para origem: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

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
