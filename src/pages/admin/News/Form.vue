 <template>
  <div class="pa-2">
    <h3 class="mb-2">{{ header }}</h3>
    <div>
      <v-form ref="form">
        <div class="mb-2">
          <v-text-field label="Заголовок" v-model="title" :rules="titleRules" required  density="compact"></v-text-field>
        </div>
        <div id="content" :class="{'has-error':contentHasError}">
          <div class="text-body-1 mb-2">Текст новости</div>
          <ckeditor :editor="editor" v-model="content" :config="editorConfig" @ready="readyEditor" @input="checkContent"
                    @focus="checkContent" @blur="checkContent"></ckeditor>
          <span v-if="contentHasError" class="message-error text-caption">Поле не может быть пустым</span>
        </div>
        <v-btn color="success" class="mt-2" @click="save()">Сохранить</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default {
  name: "NewsForm",
  data() {
    return {
      titleRules: [
        v => !!v || 'Заголовок не может быть пустым',
      ],
      editor: ClassicEditor,
      title: null,
      content: '',
      contentHasError: false,
      editorConfig: {
        language: 'ru'
      }
    }
  },
  computed: {
    header() {
      return (!this.$route.params.id) ? 'Создать новость' : 'Редактировать новость'
    }
  },
  methods: {
    checkContent() {
      this.contentHasError = !this.content;
    },
    readyEditor() {
      this.contentHasError = false
    },
    async save() {
      const {valid} = await this.$refs.form.validate()

      if (!this.content) {
        this.contentHasError = true
      }

      if (valid && !this.contentHasError) {
        if (this.title && this.content) {
          await this.$axios.post('/admin/news/save', {
            title: this.title,
            content: this.content,
            id: this.$route.params.id ? this.$route.params.id : null
          })
          this.$router.push({name: 'News'})
        }
      }

    }
  },
  async mounted() {
    if (this.$route.params.id) {
      const {data} = await this.$axios.get(`/admin/news/one/${this.$route.params.id}`)

      this.title = data.data.title
      this.content = data.data.content

    }
  }
}
</script>

<style scoped>
.message-error {
  /*font-size: 12px;*/
  color: rgb(176, 0, 32);
  padding-inline: 16px;
}
</style>