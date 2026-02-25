require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const cardRoute = require('./routes/cards');
const userRoute = require('./routes/users');

const errorMiddleware = require('./models/middlewares/error.middleware');
const {
  requestLogger,
  errorLogger,
} = require('./models/middlewares/logger.middleware');

const port = process.env.PORT || 3000;
const app = express();

/* ========================
   PARSERS
======================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ========================
   BANCO DE DADOS
======================== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado ao banco de dados'))
  .catch((error) => console.error('❌ Erro ao conectar ao banco:', error));

/* ========================
   LOGGER DE REQUISIÇÕES
======================== */
app.use(requestLogger);

/* ========================
   CONFIGURAÇÃO CORS
======================== */
const allowedOrigins = [
  'https://web-project-api-full-flax.vercel.app',
  // 'http://localhost:5173', // descomente se quiser permitir ambiente local
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* ========================
   ROTAS
======================== */
app.use('/users', userRoute);
app.use('/cards', cardRoute);

/* ========================
   ROTA NÃO ENCONTRADA
======================== */
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Rota não encontrada' });
});

/* ========================
   LOGGER DE ERROS
======================== */
app.use(errorLogger);

/* ========================
   ERROS DO CELEBRATE (JOI)
======================== */
app.use(errors());

/* ========================
   MIDDLEWARE GLOBAL DE ERRO
======================== */
app.use(errorMiddleware);

/* ========================
   START DO SERVIDOR
======================== */
app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
