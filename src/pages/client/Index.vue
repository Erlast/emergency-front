<template>
  <div>
    <h2>Новости</h2>
  </div>
  <template v-for="(item,key) in news" :key="key">
    <v-card
        class="mx-auto mb-3 news-card"
        variant="tonal"
        color="cyan-lighten-1"
        :title="item.title"
        :subtitle="$moment(item.created_at).format('DD.MM.YYYY')"

    >
      <template v-slot:append>
        <delete-button :id="item.id" @delete="deleteNews"></delete-button>
      </template>
      <v-card-text>
        <div v-html="item.content"></div>

      </v-card-text>
    </v-card>
  </template>

</template>

<script>
import {ref} from 'vue'
import DeleteButton from "@/components/DeleteButton";

export default {
  name: "IndexPage",
  components: {DeleteButton},
  setup() {
    return {
      news: ref([])
    }

  },
  methods: {
    async getNews() {
      const {data} = await this.$axios.get('/news')

      this.news = data.data
    },
    async deleteNews() {
    //  await this.$axios.delete(`/admin/news/${id}`)
      await this.getNews()
    }
  },
  async mounted() {
    await this.getNews()
  }
}
</script>

<style>
.news-card .v-card-item {
  align-items: start !important;
}
</style>