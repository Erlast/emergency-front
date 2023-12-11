<template>
  <v-btn variant="text" :color="colorButton" icon="mdi-delete" :density="density">
    <v-icon icon="mdi-delete"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>

        <v-card-text>{{ message }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Отмена</v-btn>
          <v-btn color="red" text @click="deleteNews(id)">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  name: "DeleteButton",
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default() {
        return 'Удалить новость?'
      }
    },
    url: {
      type: String,
      default() {
        return '/admin/news/'
      }
    },
    colorButton: {
      type: String,
      default() {
        return 'error'
      }
    },
    message: {
      type: String,
      default() {
        return "Вы действительно хотите удалить новость?";
      }
    },
    density: {
      type: String,
      default() {
        return 'default'
      }
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async deleteNews(id) {

      await this.$axios.delete(`${this.url}${id}`)
      this.dialog = false
      this.$emit('delete')
    }
  }
}
</script>

<style scoped>

</style>