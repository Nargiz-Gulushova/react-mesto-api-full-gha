require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');
const {
  LIMITER_CONFIG,
  PORT,
  MONGO_DB,
} = require('./utils/config');

const app = express();
app.use(cors);
app.use(express.json());
app.use(cookieParser());

// защита сервера
app.use(helmet());
app.use(LIMITER_CONFIG);

// подключение к БД
mongoose.connect(MONGO_DB, { useNewUrlParser: true });

// подключение логгера ревкестов
app.use(requestLogger);

// эндпоинт для теста pm2
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роутинг приложения
app.use(routes);

// централизованная обработка ошибок и логи
app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/errorsHandler'));

app.listen(PORT, () => console.log('Server started on', PORT));
