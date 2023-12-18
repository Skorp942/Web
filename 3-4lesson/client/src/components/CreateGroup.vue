<template>
  <div class="group-wrapper">
    <h2>Управление группами</h2>
    <form @submit.prevent="createOrUpdateGroup" class="group-form">
      <div class="form-group">
        <label for="group_name">Название группы:</label>
        <input type="text" v-model="group_name" required>
      </div>

      <div class="form-group">
        <label for="university_id">Университет:</label>
        <select v-model="selectedUniversityId" required>
          <option v-for="university in universityList" :key="university.university_id" :value="university.university_id">
            {{ university.university_name }}
          </option>
        </select>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">{{ editingGroup ? 'Обновить' : 'Создать' }}</button>
      </div>
    </form>

    <h2>Список групп</h2>
    <table class="group-table">
      <thead>
        <tr>
          <th>Название группы</th>
          <th>Университет</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in groupList" :key="group.group_id">
          <td>{{ group.group_name }}</td>
          <td>{{ universityList.length ? getUniversityName(group.university_id) : 'Неизвестно' }}</td>
          <td>
            <button @click="editGroup(group)">Редактировать</button>
            <button @click="deleteGroup(group.group_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'CreateGroup',
  data() {
    return {
      group_name: '',
      selectedUniversityId: null,
      selectedUniversityName: '',
      groupList: [],
      universityList: [],
      editingGroup: null,
    };
  },
  mounted() {
    this.fetchUniversityList();
    this.fetchGroupList();
  },
  methods: {
    async createOrUpdateGroup() {
      try {
        const token = localStorage.getItem('accessToken');
        if (this.editingGroup) {
          await axios.put(`/groups/${this.editingGroup.group_id}`, {
            group_name: this.group_name,
            university_id: this.selectedUniversityId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editingGroup = null;
        } else {
          await axios.post('/groups', {
            group_name: this.group_name,
            university_id: this.selectedUniversityId,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        this.clearForm();
        this.fetchGroupList();
      } catch (error) {
        console.error('Ошибка при обновлении/создании группы', error);
      }
    },
    async fetchGroupList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        this.groupList = response.data;

        for (const group of this.groupList) {
          console.log(group);
          await this.fetchUniversityData(group.university.university_id);
        }
      } catch (error) {
        console.error('Ошибка при получении списка групп', error);
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
    async fetchUniversityData(universityId) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/university/${universityId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.$set(this.selectedUniversityName, universityId, response.data.university_name);
      } catch (error) {
        console.error('Ошибка при получении названия университета', error);
      }
    },
    editGroup(group) {
      this.group_name = group.group_name;
      this.selectedUniversityId = group.university_id;
      this.editingGroup = group;
    },
    async deleteGroup(groupId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchGroupList();
      } catch (error) {
        console.error('Ошибка при удалении группы', error);
      }
    },
    clearForm() {
      this.group_name = '';
      this.selectedUniversityId = null;
      this.editingGroup = null;
    },
    getUniversityName(universityId) {
      const university = this.universityList.find(u => u.university_id === universityId);
      return university ? university.university_name : 'Неизвестно';
    },
  },
};
</script>

<style scoped>
.group-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.group-form {
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

.group-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.group-table th, .group-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.group-table th:last-child, .group-table td:last-child {
  text-align: center;
}

.group-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.group-table button:hover {
  background-color: #45a049;
}
</style>