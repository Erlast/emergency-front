<template>
  <v-btn density="compact" icon="mdi-plus" color="success">
    <v-icon icon="mdi-plus"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">Добавить врача</v-card-title>

        <v-card-text>
          <v-text-field
              v-model="surname"
              :rules="[v=>!!v|| 'Фамилия не может быть пустым']"
              label="Фамилия"
              required
          ></v-text-field>

          <v-text-field
              v-model="name"
              :rules="[v=>!!v|| 'Имя не может быть пустым']"
              label="Имя"
              required
          ></v-text-field>

          <v-text-field
              v-model="middle_name"
              label="Отчество"

          ></v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Закрыть</v-btn>
          <v-btn color="success" text @click="add()">Добавить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  name: "AddPerson",
  data() {
    return {
      dialog: false,
      name: null,
      surname: null,
      middle_name: null
    }
  },
  methods: {
    async add() {
      await this.$axios.post(`/admin/person/add`, {
        surname: this.surname,
        name: this.name,
        middle_name: this.middle_name
      })
      this.dialog = false
      this.surname = null
      this.name = null
      this.middle_name = null
      this.$emit('add')

    }
  }
}
</script>

<style scoped>

</style>