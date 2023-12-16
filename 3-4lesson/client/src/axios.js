import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Замените на ваш адрес сервера NestJS
  timeout: 5000, // Время ожидания запроса
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;