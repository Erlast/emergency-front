<template>
  <v-dialog v-model="dialog" width="500" activator="parent">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>

      <v-card-text>{{ message }}</v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('update:show',false)">Отмена</v-btn>
        <v-btn color="red" text @click="$emit('onConfirm')">Удалить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "DeleteDialog",

  props: {
    message: {
      type: String,
      default() {
        return 'Вы точно хотите удалить'
      }
    },
    title: {
      type: String,
      default() {
        return 'Подтвердите удаление'
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  watch: {
    show(value) {
      this.dialog = value
    }
  },
  // mounted() {
  //   this.dialog = this.show
  // }
}
</script>

<style scoped>

</style>