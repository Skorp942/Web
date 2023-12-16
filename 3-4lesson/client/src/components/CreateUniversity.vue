<template>
  <div class="university-wrapper">
    <h2>Управление университетами</h2>
    <form @submit.prevent="createOrUpdateUniversity" class="university-form">
      <div class="form-group">
        <label for="name">Название:</label>
        <input type="text" v-model="name" required>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">{{ editingUniversity ? 'Обновить' : 'Создать' }}</button>
      </div>
    </form>

    <h2>Список университетов</h2>
    <table class="university-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="university in universityList" :key="university.university_id">
          <td>{{ university.university_name }}</td>
          <td>
            <button @click="editUniversity(university)">Редактировать</button>
            <button @click="deleteUniversity(university.university_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'CreateUniversity',
  data() {
    return {
      name: '',
      universityList: [],
      editingUniversity: null,
    };
  },
  mounted() {
    this.fetchUniversityList();
  },
  methods: {
    async createOrUpdateUniversity() {
      try {
        const token = localStorage.getItem('accessToken');
        if (this.editingUniversity) {
          await axios.put(`/university/${this.editingUniversity.university_id}`, {
            university_name: this.name,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editingUniversity = null;
        } else {
          await axios.post('/university', {
            university_name: this.name,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        this.clearForm();
        this.fetchUniversityList();
      } catch (error) {
        console.error('Ошибка при обновлении/создании университета', error);
      }
    },
    async fetchUniversityList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/university', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.universityList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка университетов', error);
      }
    },
    editUniversity(university) {
      this.name = university.university_name;
      this.editingUniversity = university;
    },
    async deleteUniversity(universityId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/university/${universityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchUniversityList();
      } catch (error) {
        console.error('Ошибка при удалении университета', error);
      }
    },
    clearForm() {
      this.name = '';
      this.editingUniversity = null;
    },
  },
};
</script>


<style scoped>
.university-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.university-form {
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

.university-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.university-table th, .university-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.university-table th:last-child, .university-table td:last-child {
  text-align: center;
}

.university-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.university-table button:hover {
  background-color: #45a049;
}
</style>