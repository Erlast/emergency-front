<template>
  <v-btn density="compact" icon="mdi-plus" color="success">
    <v-icon icon="mdi-plus"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">Добавить IP</v-card-title>

        <v-card-text>

          <v-text-field
              v-maska:[options]
              v-model="ip_address"
              :rules="[v=>!!v|| 'IP адрес не может быть пустым']"
              label="IP адрес"
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
  name: "AddIp",
  setup() {
    return {
      options: {
        mask: '#00.#00.#00.#00',
        tokens:{
          0:{ pattern: /[0-9]/, optional: true }
        }
      }
    }
  },
  data() {
    return {
      ip_address: null,
      dialog: false,
    }
  },
  methods: {
    async add() {
      await this.$axios.post(`/admin/free-ip/add`, {ip_address: this.ip_address})
      this.dialog = false
      this.ip_address = null
      this.$emit('add')

    }
  }
}
</script>

<style scoped>

</style>