const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Обработка запросов
app.get('/', (req, res) => {
  res.send('Привет, мир!');
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});