<template>
  <div class="user-wrapper">
    <h2>Управление пользователями</h2>
    <form @submit.prevent="createOrUpdateUser" class="user-form">
      <div class="form-group">
        <label for="username">Имя пользователя:</label>
        <input type="text" v-model="username" required>
      </div>

      <div class="form-group">
        <label for="password">Пароль:</label>
        <input type="password" v-model="password" required>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">{{ editingUser ? 'Обновить' : 'Создать' }}</button>
      </div>
    </form>

    <h2>Список пользователей</h2>
    <table class="user-table">
      <thead>
        <tr>
          <th>Имя пользователя</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userList" :key="user.user_id">
          <td>{{ user.username }}</td>
          <td>
            <button @click="editUser(user)">Редактировать</button>
            <button @click="deleteUser(user.user_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'ManageUsers',
  data() {
    return {
      username: '',
      password: '',
      userList: [],
      editingUser: null,
    };
  },
  mounted() {
    this.fetchUserList();
  },
  methods: {
    async createOrUpdateUser() {
      try {
        const token = localStorage.getItem('accessToken');
        if (this.editingUser) {
          if (this.password.trim() !== '') {
            await axios.put(`/users/${this.editingUser.user_id}`, {
              username: this.username,
              password: this.password,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            console.warn('Пароль не может быть пустым.');
            return;
          }
          this.editingUser = null;
        } else {
          if (this.password.trim() !== '') {
            await axios.post('/users', {
              username: this.username,
              password: this.password,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } else {
            console.warn('Пароль не может быть пустым.');
            return;
          }
        }

        this.clearForm();
        this.fetchUserList();
      } catch (error) {
        console.error('Ошибка при обновлении/создании пользователя', error);
      }
    },
    async fetchUserList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.userList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка пользователей', error);
      }
    },
    editUser(user) {
      this.username = user.username;
      this.password = user.password ? '' : this.password;
      this.editingUser = user;
    },
    async deleteUser(userId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchUserList();
      } catch (error) {
        console.error('Ошибка при удалении пользователя', error);
      }
    },
    clearForm() {
      this.username = '';
      this.password = '';
      this.editingUser = null;
    },
  },
};
</script>

<style scoped>
.user-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.user-form {
  max-width: 400px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.form-actions {
  margin-top: 10px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.user-table th, .user-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.user-table th:last-child, .user-table td:last-child {
  text-align: center;
}

.user-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.user-table button:hover {
  background-color: #45a049;
}
</style>