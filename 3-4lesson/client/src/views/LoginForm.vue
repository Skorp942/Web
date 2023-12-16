<template>
  <div>
    <h2>Авторизация</h2>
    <form @submit.prevent="login" class="login-form">
      <label for="username">Имя пользователя:</label>
      <input type="text" v-model="username" required>

      <label for="password">Пароль:</label>
      <input type="password" v-model="password" required>

      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Добавлено поле для отображения ошибок
    };
  },
  methods: {
    login() {
      const data = {
        username: this.username,
        password: this.password,
      };

      axios.post('http://localhost:3000/auth/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log('Успешная авторизация', response.data);

        localStorage.setItem('isAuthenticated', 'true');

        const accessToken = response.data.access_token;

        localStorage.setItem('accessToken', accessToken);

        this.errorMessage = '';

        this.$router.push('/Home');
      })
      .catch(error => {
        console.error('Ошибка авторизации', error);
        
        // Отображение сообщения об ошибке пользователю
        this.errorMessage = 'Неверное имя пользователя или пароль';
      });
    },
  },
};
</script>

  
  <style scoped>
    .login-form {
      max-width: 300px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    label {
      display: block;
      margin-bottom: 8px;
    }

    input {
      width: 100%;
      padding: 8px;
      margin-bottom: 16px;
      box-sizing: border-box;
    }

    button {
      background-color: #4caf50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  </style>