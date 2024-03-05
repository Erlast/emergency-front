<template>
  <div>
    <h2>Новости</h2>
  </div>
  <template v-for="(item,key) in news" :key="key">
    <v-card
        class="mx-auto mb-3 news-card"
        variant="tonal"
        color="cyan-lighten-1"
    >
      <v-card-item class="bg-cyan-darken-1">
        <v-card-title>
          <span class="text-sm-h6">{{item.title}}</span>
        </v-card-title>
        <v-card-subtitle>
          {{$moment(item.created_at).format('DD.MM.YYYY')}}
        </v-card-subtitle>
        <template v-if="!isGuest() && user().role===ADMIN_ROLE" v-slot:append>
          <v-defaults-provider
              :defaults="{
            VBtn: {
              variant: 'text',
              density: 'comfortable',
            }
          }"
          >
            <delete-button :id="item.id" @delete="deleteNews" color-button="pink-darken-3"></delete-button>
          </v-defaults-provider>
        </template>
      </v-card-item>

      <v-card-text class="mt-4">
        <div v-html="item.content"></div>
      </v-card-text>
    </v-card>
  </template>

</template>

<script>
import {isGuest, user, ADMIN_ROLE} from "@/utils/auth";
import {ref} from 'vue'
import DeleteButton from "@/components/DeleteComponent/Index";

export default {
  name: "IndexPage",
  components: {DeleteButton},
  setup() {
    return {
      news: ref([]),
      isGuest,
      user,
      ADMIN_ROLE
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