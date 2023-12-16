import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../views/LoginForm.vue';
import HomePage from '../components/HomePage.vue';
import CreateUser from '../components/CreateUser.vue';
import CreateUniversity from '../components/CreateUniversity.vue';
import CreateGroup from '../components/CreateGroup.vue';
import CreateStudent from '../components/CreateStudent.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginForm },
    { path: '/Home', component: HomePage, meta: { requiresAuth: true } },
    { path: '/user', component: CreateUser, meta: { requiresAuth: true } },
    { path: '/university', component: CreateUniversity, meta: { requiresAuth: true } },
    { path: '/group', component: CreateGroup, meta: { requiresAuth: true } },
    { path: '/student', component: CreateStudent, meta: { requiresAuth: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    

    if (!isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;