<template>
  <v-btn variant="text" density="compact">
    {{ item.name }}
    <v-dialog
        v-model="dialog"
        width="600"
        activator="parent"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Проигрывается файл {{item.name}}</span>
        </v-card-title>
        <v-card-text>
          <div style="width: 500px">
            <vue3-video-player
                autoplay
                :src="`${processEnv.VUE_APP_URL}/storage/${item.url}`"
                :title="item.name"
                cover="//static.smartisanos.cn/pr/assets/images/coming-for-u-video-cover.f8caa5277476d5cdb97ae189c68846b2.jpg"

            >
            </vue3-video-player>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script>
export default {
  name: "PlayVideo",
  props: {
    item: Object
  },
  data() {
    return {
      processEnv: process.env,
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>