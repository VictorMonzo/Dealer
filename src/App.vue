<template>
  <div id="app">
    <v-bottom-navigation :value="value" class="s-dark" grow>
      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="logo.svg"
        width="100"
      />

      <v-btn class="s-dark">
        <span
          ><router-link to="/"
            ><v-icon class="s-light">mdi-widgets</v-icon></router-link
          ></span
        >
      </v-btn>

      <v-btn v-if="!$store.getters.getAuth" class="s-dark">
        <span
          ><router-link to="/login"
            ><v-icon class="s-light">mdi-account</v-icon></router-link
          ></span
        >
      </v-btn>

      <v-btn v-else @click="logout" class="s-dark">
        <span><v-icon class="s-light">mdi-close</v-icon></span>
      </v-btn>
    </v-bottom-navigation>

    <router-view />
  </div>
</template>

<script>
export default {
  data: () => ({
    value: 1,
  }),
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
* {
  font-family: "Poppins", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.v-bottom-navigation {
  align-items: center;
}

.v-bottom-navigation a {
  text-decoration: none;
}

.s-dark {
  background-color: #1e1e1e !important;
}

.s-light {
  color: #fff !important;
  text-decoration: none;
}

.s-red {
  background-color: #e54b4b;
}
</style>
