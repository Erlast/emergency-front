<template>
  <v-btn density="compact" icon="mdi-plus" color="success">
    <v-icon icon="mdi-plus"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">{{ dictionaries[dictionary].title }}</v-card-title>

        <v-card-text>

          <v-text-field
              v-model="name"
              label="Наименование"
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
  name: "AddFormDictionary",
  setup() {
    const dictionaries = {
      brand: {
        title: 'Добавить производителя',
      },
      printerModel: {
        title: 'Добавить модель принтера'
      },
      department: {
        title: 'Добавить отдел'
      },


    }
    return {
      dictionaries
    }
  },
  props: {
    dictionary: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: null,
      dialog: false,
    }
  },
  methods: {
    async add() {
      await this.$axios.post(`/admin/dictionary/${this.dictionary}`, {name: this.name})
      this.dialog = false
      this.name = null
      this.$emit('add', this.dictionary)

    }
  }

}
</script>

<style scoped>

</style>