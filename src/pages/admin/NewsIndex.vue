<template>
  <v-row class="mb-2 pa-3 justify-end">
    <v-btn color="success" class="mb-2" :to="{name:'NewsForm'}">Добавить</v-btn>
    <v-divider></v-divider>
  </v-row>
  <v-row class="mt-2 px-3">
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="getNews"
        loading-text="Загрузка... подождите"
        :items="news">
      <template #[`item.created_at`]="{ item }">
        {{ $moment(item.created_at).format("DD.MM.YYYY HH:mm:ss") }}
      </template>
      <template #[`item.updated_at`]="{ item }">
        {{ $moment(item.updated_at).format("DD.MM.YYYY HH:mm:ss") }}
      </template>
      <template #[`item.buttons`]="{ item }">
        <v-btn variant="text" color="success" icon="mdi-pencil" :to="{name:'NewsForm',params:{id:item.id}}"></v-btn>
        <delete-button :id="item.id" @delete="deleteNews"></delete-button>

      </template>
      <template v-slot:no-data>
        Нет данных
      </template>
    </v-data-table>

  </v-row>
</template>

<script>

import DeleteButton from "@/components/DeleteButton";
export default {
  name: "NewsIndex",
  components: {DeleteButton},
  setup() {


  },
  data() {
    return {
      news: [],
      dialog: false,
      itemsPerPage: 5,
      headers: [
        {
          title: '#',
          align: 'start',
          sortable: true,
          key: 'id',
        },
        {title: 'Заголовок', key: 'title', align: 'start'},
        {title: 'Дата создания', key: 'created_at', align: 'start'},
        {title: 'Дата редактирования', key: 'updated_at', align: 'start'},
        {title: '', key: 'buttons', align: 'end'},
      ],
      loading: true,
      totalItems: 0,
    }
  },
  methods: {
    async getNews() {
      this.loading = true
      const {data} = await this.$axios.get('/admin/news')
      this.news = data.data.news
      this.totalItems = data.data.total
      this.loading = false
    },
    async deleteNews() {
     // console.log(id)
     // await this.$axios.delete(`/admin/news/${id}`)
    //  this.dialog = false
      await this.getNews()
    }
  },
}
</script>

<style scoped>

</style>