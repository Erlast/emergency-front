<template>
  <v-btn variant="text" :color="colorButton" icon="mdi-delete" :density="density">
    <v-icon icon="mdi-delete"/>
    <Dialog :show="dialog" @onConfirm="onDelete"/>
  </v-btn>
</template>

<script>
import Dialog from "@/components/DeleteComponent/Dialog";

export default {
  name: "DeleteButton",
  components: {
    Dialog
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default() {
        return 'Подтвердите удаление?'
      }
    },
    // url: {
    //   type: String,
    //   default() {
    //     return '/admin/news/'
    //   }
    // },
    colorButton: {
      type: String,
      default() {
        return 'error'
      }
    },
    message: {
      type: String,
      default() {
        return "Вы действительно хотите удалить?";
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
    onDelete() {

      //await this.$axios.delete(`${this.url}${id}`)
      this.dialog = false
      this.$emit('delete', this.id)
    }
  }
}
</script>

<style scoped>

</style>