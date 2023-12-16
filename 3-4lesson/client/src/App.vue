<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeMount() {
    this.$router.beforeEach((to, from, next) => {
      if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!this.isUserLoggedIn()) {
          next('/');
        } else {
          next();
        }
      } else {
        next();
      }
    });
  },
  methods: {
    isUserLoggedIn() {
      return true; 
    },
    logout() {
      // Ваш код для выхода
      console.log('Выход выполнен.');
      this.$router.push('/'); 
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
