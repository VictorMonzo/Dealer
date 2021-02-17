<template>
  <v-container class="container-login">
    <v-alert
      v-model="errorAuth"
      dismissible
      type="error"
      class="msg-alert"
      >{{ errorMsg }}</v-alert
    >

    <v-card>
      <v-toolbar flat class="s-red" dark>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="login()"
        >
          <v-text-field
            v-model="user.login"
            :rules="emailRules"
            label="E-mail"
            autofocus
            required
          ></v-text-field>

          <v-text-field
            :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show4 ? 'text' : 'password'"
            :rules="passwordRules"
            label="Contraseña"
            @click:append="show4 = !show4"
            v-model="user.password"
            required
          ></v-text-field>

          <v-card-actions>
            <v-btn :disabled="!valid" class="btn-primary s-mr1" type="submit">
              Login
            </v-btn>

            <v-btn class="btn-reset btn-red" @click="reset"> Reset </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    user: {},
    valid: true,
    emailRules: [
      (v) => !!v || "E-mail es obligatorio",
      (v) => /.+@.+\..+/.test(v) || "E-mail no es válido",
    ],

    show4: false,
    password: "Password",
    passwordRules: [(v) => !!v || "La contraseña es obligatorio"],

    errorAuth: false,
    errorMsg: "",
  }),

  methods: {
    login() {
      this.errorAuth = false;
      this.$store
        .dispatch("login", this.user)
        .then(() => {
          this.$store.dispatch("allStates");
          this.$router.push("/");
        })
        .catch((err) => {
          this.errorAuth = true;
          this.errorMsg = err.message || err;
        });
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.errorAuth = false;
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.msg-alert {
  background-color:#E54B4B!important;
}

.container-login
{
  max-width: 700px;
  margin-top: 100px;
}

.s-red
{
  background-color: #E54B4B!important;
}

.btn-red{ background-color: #E54B4B!important; border: 1px solid #E54B4B; color: #fff}
.btn-red:hover,
.btn-red:focus,
.btn-red:active
{ 
	background-color: transparent!important; 
	border-color: #E54B4B!important;
	box-shadow: none!important;
	color: #E54B4B!important;
}

.btn-primary{ background-color: #2B59C3!important; border: 1px solid #2B59C3; color: #fff}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary:active
{ 
	background-color: transparent!important; 
	border-color: #2B59C3!important;
	box-shadow: none!important;
	color: #2B59C3!important;
}

.s-mr1
{
  margin-right: 15px;
}
</style>