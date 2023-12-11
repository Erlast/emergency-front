<template>
  <div>
    <h2>{{ name }}</h2>
  </div>
  <v-list-item
      v-for="(item,key) in folder.children"
      :key="key"
      :prepend-icon="item.is_dir?'mdi-folder':(item.file_type==='file'?'mdi-file':'mdi-file-video')"
  >
    <template v-slot:title>
      <v-btn variant="text" :to="{name:'Page',params:{slug:item.slug}}" v-if="item.is_dir">{{ item.name }}</v-btn>
      <v-btn variant="text" @click="downloadDoc(item.url)" v-else-if="item.file_type==='file'">{{ item.name }}</v-btn>
     <play-video :item="item" v-else/>

    </template>
  </v-list-item>
</template>

<script>
import defaultSettings from '@/utils/settings'
import PlayVideo from "@/components/PlayVideo";


export default {
  name: "PageIndex",
  components: {PlayVideo},
  data() {
    return {
      folder: {}
    }
  },
  computed: {
    name() {
      return this.folder ? this.folder.name : ''
    }
  },
  watch: {
    async $route(to) {
      console.log(to)
      if (to.name === 'Page')
        await this.getFolder()
    },
  },
  methods: {
    async getFolder() {
      const {data} = await this.$axios.get(`/section/${this.$route.params.slug}`)


      this.folder = data.data
      this.$route.meta.title += ` - ${this.folder.name} - ${defaultSettings.title}`
      document.title = this.$route.meta.title
    },
    downloadDoc(url) {
      this.$axios.post('/download/', {fileUrl: url}, {responseType: 'arraybuffer'}).then(res => {
        let blob = new Blob([res.data], {type: 'application/*'})
        let link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = url
        link._target = 'blank'
        link.click();
      })
    },
  },
  async mounted() {
    await this.getFolder()

  }
}
</script>

<style scoped>

</style>