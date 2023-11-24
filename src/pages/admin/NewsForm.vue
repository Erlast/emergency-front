<template>
  <div class="pa-2">
    <div class="mb-2">{{ header }}</div>
    <div>
      <div class="mb-2">
        <v-text-field label="Заголовок" v-model="title"></v-text-field>
      </div>
      <ckeditor :editor="editor" v-model="content" :config="editorConfig"></ckeditor>
      <v-btn color="success" class="mt-2" @click="save()">Сохранить</v-btn>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default {
  name: "NewsForm",
  data() {
    return {
      editor: ClassicEditor,
      title: null,
      content: '',
      editorConfig: {}
    }
  },
  computed: {
    header() {
      return (!this.$route.params.id) ? 'Создать новость' : 'Редактировать новость'
    }
  },
  methods: {
    async save() {
      if (this.title && this.content) {
        await this.$axios.post('/admin/news/save', {
          title: this.title,
          content: this.content,
          id: this.$route.params.id ? this.$route.params.id : null
        })
        this.$router.push({name: 'News'})
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
.ck-editor__editable_inline {
  min-height: 400px;
}

.ck-editor__editable_inline:not(.ck-comment__input *) {
  height: 300px;
  overflow-y: auto;
}
</style>