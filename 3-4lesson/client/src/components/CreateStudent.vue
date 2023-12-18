<template>
  <div class="student-wrapper">
    <h2>Управление студентами</h2>
    <form @submit.prevent="createOrUpdateStudent" class="student-form">
      <div class="form-group">
        <label for="full_name">ФИО:</label>
        <input type="text" v-model="full_name" required>
      </div>

      <div class="form-group">
        <label for="group">Группа:</label>
        <select v-model="selectedGroup" required>
          <option v-for="group in groupList" :key="group.group_id" :value="group.group_id">
            {{ group.group_name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="institution">Вуз:</label>
        <select v-model="selectedInstitution" required>
          <option v-for="institution in institutionList" :key="institution.university_id" :value="institution.university_id">
            {{ institution.university_name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="admission_year">Год поступления:</label>
        <input type="number" v-model="admission_year">
      </div>

      <div class="form-group">
        <label for="age">Год рождения:</label>
        <input type="number" v-model="age">
      </div>

      <div class="form-group">
        <label for="subjects">Изучаемые предметы:</label>
        <input type="text" v-model="subjects">
      </div>

      <div class="form-group">
        <label for="grades">Оценки:</label>
        <input type="text" v-model="grades">
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">{{ editingStudent ? 'Обновить' : 'Создать' }}</button>
      </div>
    </form>

    <h2>Список студентов</h2>
    <table class="student-table">
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Группа</th>
          <th>Вуз</th>
          <th>Год поступления</th>
          <th>Возраст</th>
          <th>Изучаемые предметы</th>
          <th>Оценки</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in studentList" :key="student.student_id">
          <td>{{ student.full_name }}</td>
          <td>{{ getGroupName(student.group) }}</td>
          <td>{{ getInstitutionName(student.institution) }}</td>
          <td>{{ student.admission_year }}</td>
          <td>{{ currentYear - student.age }}</td>
          <td>{{ student.subjects }}</td>
          <td>{{ student.grades }}</td>
          <td>
            <button @click="editStudent(student)">Редактировать</button>
            <button @click="deleteStudent(student.student_id)">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/axios';

export default {
  name: 'CreateStudent',
  data() {
    return {
      full_name: '',
      group: '',
      institution: '',
      admission_year: null,
      age: null,
      subjects: '',
      grades: '',
      studentList: [],
      editingStudent: null,
      currentYear: new Date().getFullYear(),
      selectedGroup: null,
      groupList: [],
      selectedInstitution: null,
      institutionList: [],
    };
  },
  mounted() {
    this.fetchStudentList();
    this.fetchGroupList();
    this.fetchInstitutionList();
  },
  methods: {
    getGroupName(groupId) {
      const group = this.groupList.find(group => String(group.group_id) === String(groupId));
      return group ? group.group_name : '';
    },
    getInstitutionName(institutionId) {
      const institution = this.institutionList.find(inst => String(inst.university_id) === String(institutionId));
      return institution ? institution.university_name : '';
    },
    async createOrUpdateStudent() {
      try {
        const token = localStorage.getItem('accessToken');
        const studentData = {
          full_name: this.full_name,
          group: this.selectedGroup,
          institution: this.selectedInstitution,
          admission_year: this.admission_year,
          age: this.age,
          subjects: this.subjects,
          grades: this.grades,
        };

        if (this.editingStudent) {
          await axios.put(`/students/${this.editingStudent.student_id}`, studentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.editingStudent = null;
        } else {
          await axios.post('/students', studentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        this.clearForm();
        this.fetchStudentList();
      } catch (error) {
        console.error('Ошибка при обновлении/создании студента', error);
      }
    },
    async fetchStudentList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.studentList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка студентов', error);
      }
    },
    editStudent(student) {
      this.full_name = student.full_name;
      this.selectedGroup = student.group; 
      this.selectedInstitution = student.institution;
      this.admission_year = student.admission_year;
      this.age = student.age;
      this.subjects = student.subjects;
      this.grades = student.grades;
      this.editingStudent = student;
    },
    async deleteStudent(studentId) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.fetchStudentList();
      } catch (error) {
        console.error('Ошибка при удалении студента', error);
      }
    },
    clearForm() {
      this.full_name = '';
      this.selectedGroup = null;
      this.selectedInstitution = null;
      this.admission_year = null;
      this.age = null;
      this.subjects = '';
      this.grades = '';

      this.editingStudent = null;
    },
    async fetchGroupList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.groupList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка групп', error);
      }
    },
    async fetchInstitutionList() {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/university', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.institutionList = response.data;
      } catch (error) {
        console.error('Ошибка при получении списка ВУЗов', error);
      }
    },
  },
};
</script>

<style scoped>
.student-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.student-form {
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

.form-group select,
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

.student-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.student-table th, .student-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.student-table th:last-child, .student-table td:last-child {
  text-align: center;
}

.student-table button {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.student-table button:hover {
  background-color: #45a049;
}
</style>