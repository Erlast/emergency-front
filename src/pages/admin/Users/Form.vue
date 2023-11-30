<template>
  <div class="pa-2">
    <h3 class="mb-2">{{ header }}</h3>

    <div>
      <v-form ref="form">
        <div class="mb-2">
          <v-text-field label="Имя (логин)" v-model="name" :rules="nameRules" required
                        density="compact" ref="name"></v-text-field>
        </div>
        <div class="mb-2">
          <v-text-field label="E-mail" v-model="email" type="email" :rules="emailRules" required
                        density="compact" ref="email"></v-text-field>
        </div>
        <div class="mb-2">
          <v-text-field label="Пароль" v-model="password" :rules="passwordRules" required
                        density="compact" ref="password" append-inner-icon="mdi-autorenew"
                        @click:append-inner="passwordRenew"></v-text-field>
        </div>
        <div class="mb-2">
          <v-autocomplete
              density="compact"
              v-model="role"
              item-value="id"
              item-title="name"
              label="Права"
              :items="roles"
          ></v-autocomplete>
        </div>

        <v-btn color="success" class="mt-2" @click="save()">Сохранить</v-btn>
      </v-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserForm",
  data() {
    return {
      nameRules: [
        v => !!v || 'Логин не может быть пустым',
      ],
      emailRules: [
        v => !!v || 'E-mail не может быть пустым',
      ],
      // passwordRules:,
      name: null,
      email: null,
      password: null,
      role: 1,
      roles: [
        {
          id: 1,
          name: 'Пользователь',
        },
        {
          id: 2,
          name: 'Администратор'
        },
      ],
    }
  },
  computed: {
    header() {
      return (!this.$route.params.id) ? 'Добавить пользователя' : 'Редактировать пользователя'
    },
    passwordRules() {
      return (!this.$route.params.id) ? [v => !!v || 'Пароль не может быть пустым',] : []
    }
  },
  methods: {
    async save() {

      const {valid} = await this.$refs.form.validate()

      if (valid) {
        await this.$axios.post('/admin/user', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: this.role,
          id: this.$route.params.id ? parseInt(this.$route.params.id) : null
        })

        this.$notify({
          title: 'Информация о пользователе сохранена.',
          type: 'success',
        })

        this.$router.push({name: 'Users'})

      }

    },

    async getUser() {
      if (this.$route.params.id) {
        const {data} = await this.$axios.get(`/admin/user/${this.$route.params.id}`)

        this.name = data.data.name
        this.email = data.data.email
        this.role = data.data.role

      }
    },
    passwordRenew() {
      this.password = Math.random().toString(36).slice(-8);
    }
  },
  async mounted() {
    await this.getUser()
  }
}
</script>

<style scoped>

</style>