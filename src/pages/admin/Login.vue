<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-sheet width="400" class="mx-auto">
      <h3 class="mb-3 d-flex justify-center">Вход в администартивную зону</h3>
      <v-form fast-fail @submit.prevent="login" ref="loginForm">
        <v-text-field
            v-model="username"
            label="Логин"
            :rules="usernameRules"
        ></v-text-field>

        <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Пароль"
            type="password"></v-text-field>

        <v-btn type="submit" color="cyan-darken-1" block class="mt-2">Вход</v-btn>

      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import {loginWithToken, setToken, ADMIN_ROLE} from "@/utils/auth";

export default {
  name: "LoginPage",
  data() {
    return {
      username: '',
      password: '',
      usernameRules: [
        v => !!v || 'Логин не может быть пустым',
      ],
      passwordRules: [
        v => !!v || 'Пароль не может быть пустым',
      ],
    };
  },
  methods: {
    async login() {
      const progress = this.$progress.start();

      const {valid} = await this.$refs.loginForm.validate()

      if (valid) {
        const {data} = await this.$axios.post('/auth/login', {
          login: this.username,
          password: this.password
        })

        let path = this.$route.query.redirect ? this.$route.query.redirect : '/'

        if (data.access_token) {
          await setToken(data.access_token)

          const {data: user1} = await this.$axios.get('/user')

          await loginWithToken(data, user1.data)

          progress.finish()

          this.$notify({
            title: 'Успешный вход',
            type: 'success',
          })

          if (user1.role !== ADMIN_ROLE) {
            this.$router.push({path: '/'})
            return
          }

          this.$router.push({path: path})
        }

      } else {
        progress.finish()
        return false
      }
      progress.finish()
    },
  },
}
</script>

<style scoped>

</style>