<template>
  <v-btn density="compact" icon="mdi-plus" color="success">
    <v-icon icon="mdi-plus"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">Добавить операционную систему</v-card-title>

        <v-card-text>

          <v-text-field
              v-model="name"
              :rules="[v=>!!v|| 'Название не может быть пустым']"
              label="Название операционной системы"
              required
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
  name: "AddOperatingSystem",
  data() {
    return {
      name: null,
      dialog: false,
    }
  },
  methods: {
    async add() {
      await this.$axios.post(`/admin/operating-system/add`, {name: this.name})
      this.dialog = false
      this.name = null
      this.$emit('add')

    }
  }
}
</script>

<style scoped>

</style>