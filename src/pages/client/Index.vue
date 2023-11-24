<template>
  <div>Новости</div>
  <template v-for="(key,item) in news" :key="key">
    <v-card
        class="mx-auto"
        max-width="344"
        hover
    >
      <v-card-item>
        <v-card-title>
          {{item.title}}
        </v-card-title>
        <v-card-subtitle>
          {{item.description}}
        </v-card-subtitle>
      </v-card-item>

      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </v-card-text>
    </v-card>
  </template>

</template>

<script>
import {ref} from 'vue'

export default {
  name: "IndexPage",
  setup() {
    return {
      news: ref([])
    }

  },
  methods: {},
  async mounted() {
    const {data} = await this.$axios.get('/news')

    this.news = data.data
  }
}
</script>

<style scoped>

</style>