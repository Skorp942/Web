<template>
  <div>
    <h2>Главная страница</h2>
    <router-link to="/user">
      <button>Пользователи</button>
    </router-link>
    <router-link to="/university">
      <button>Вузы</button>
    </router-link>
    <router-link to="/group">
      <button>Группы</button>
    </router-link>
    <router-link to="/student">
      <button>Студента</button>
    </router-link>
    <button @click="logout" class="logout-button">Выход</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push('/');
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
.logout-button {
  background-color: red;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: darkred;
}
</style>