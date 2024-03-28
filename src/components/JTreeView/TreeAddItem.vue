<template>
  <v-btn v-bind="props" :icon="icon" density="compact" variant="text" class="mr-1"
         :color="color">
    <v-icon :icon="icon"/>
    <v-dialog v-model="dialog" width="500" activator="parent">
      <v-card>
        <v-card-title class="text-h5">{{ title }}</v-card-title>

        <v-card-text>
          <v-form ref="form">
            <div class="mb-2">
              <v-autocomplete
                  density="compact"
                  v-model="type"
                  item-value="id"
                  item-title="name"
                  label="Что добавляем"
                  :items="types"
              ></v-autocomplete>
            </div>
            <v-text-field
                density="compact"
                v-model="name"
                :error-messages="(v$.name.$errors.length)?v$.name.$errors.map(e => e.$message):''"
                :label="(type===1)?'Наименование раздела':'Наименование документа'"
                required
                @input="v$.name.$touch"
                @blur="v$.name.$touch"
            ></v-text-field>

            <v-checkbox label="Сгененрировать имя папки" density="compact"
                        v-model="generate_slug" v-if="type===1"></v-checkbox>

            <v-text-field
                v-if="!generate_slug"
                density="compact"
                :error-messages="(v$.slug.$errors.length)?v$.slug.$errors.map(e => e.$message):''"
                v-model="slug"
                label="Имя папки"
                required
                @input="v$.slug.$touch"
                @blur="v$.slug.$touch"
            ></v-text-field>

            <v-checkbox label="Общедоступная дериктория" density="compact"
                        v-model="is_share" v-if="type===1"></v-checkbox>

            <template v-if="type===2">
              <v-file-input
                  v-if="!file"
                  v-model="file"
                  placeholder="Выберите файл"
                  label="Документ"
                  prepend-icon="mdi-paperclip"
              ></v-file-input>
              <div class="d-flex align-center" v-else>
                <v-btn prepend-icon="mdi-paperclip" variant="text" @click="downloadDoc(item.url)">Документ</v-btn>
                <v-btn icon="mdi-close" variant="text" color="red-accent-3" @click="deleteFile(item.url)"/>
              </div>
            </template>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Закрыть</v-btn>
          <v-btn color="red" text @click="addItem">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
import {useVuelidate} from '@vuelidate/core'
import {required, helpers} from '@vuelidate/validators'

const alphaD = helpers.regex(/(^[-_a-zA-z\d+]+?$)/)

export default {
  name: "TreeAddItem",
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    const localRules = {
      slug: {
        alphaD: helpers.withMessage('Имя папки содержит недопустимые символы', alphaD)
      },
      name: {
        required: helpers.withMessage('Поле наименование не должно быть пустым', required)
      }
    }

    if (!this.generate_slug) {
      localRules.slug.required = helpers.withMessage('Имя папки не должно быть пустым', required)
    }

    return localRules

  },
  props: {
    props: {
      type: Object,
      required: true
    },
    icon: {
      type: String,
      default() {
        return 'mdi-plus';
      }
    },
    color: {
      type: String,
      default() {
        return 'cyan-darken-1'
      }
    },
    action: {
      type: String,
      default() {
        return 'add'
      }
    },
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return `${this.id ? 'Редактирование' : 'Добавление'} раздела или документа`
    }
  },
  data() {
    return {
      id: null,
      dialog: false,
      name: null,
      file: null,
      is_share: false,
      type: 1,
      generate_slug: true,
      slug: null,
      types: [
        {
          id: 1,
          name: 'Раздел',
        },
        {
          id: 2,
          name: 'Документ',
        }
      ]
    }
  },
  methods: {
    async addItem() {

      const result = await this.v$.$validate()

      if (result) {
        const item = {
          id: this.id,
          name: this.name,
          is_dir: (this.type === 1),
          p_id: (this.action === 'edit') ? this.item.p_id : this.item.id,
          file: this.file,
          generate_slug: this.generate_slug,
          slug: this.slug,
          is_share: this.is_share
        }

        this.$emit('addItem', item);

        this.dialog = false
        this.name = null
        this.file = null
        this.slug = null
        this.generate_slug = true
        this.id = null
        this.is_share = false
      }

    },
    deleteFile() {
      this.file = null
    },
    async getInfo() {
      this.type = this.item.is_dir ? 1 : 2
      this.id = this.item.id
      this.name = this.item.name
      this.slug = this.item.slug
      this.file = (!this.item.is_dir) ? this.item.url : null
      this.is_share = this.item.is_share
    }
  },
  async beforeUpdate() {
    if (this.action === 'edit') {
      await this.getInfo()
    }
  }
}
</script>

<style scoped>

</style>