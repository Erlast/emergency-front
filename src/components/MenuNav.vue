<template>
  <v-list nav>
    <v-list-item-title class="d-flex justify-center mb-3"><h1>ГКБ №34</h1></v-list-item-title>
    <user-menu v-if="!isGuest()"/>
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-home" to="/" exact title="Главная"></v-list-item>
    <v-list-item prepend-icon="mdi-folder" :to="{name:'Page',params:{slug:item.slug}}" :title="item.name"
                 v-for="(item,key) in menu" :key="key"></v-list-item>
    <v-list-item prepend-icon="mdi-phone" title="Контакты"></v-list-item>
    <v-list-item prepend-icon="mdi-information" to="/about" title="О нас"></v-list-item>
    <admin-menu v-if="!isGuest()"/>

  </v-list>

</template>

<script>
import {isGuest} from "@/utils/auth";
import UserMenu from "@/components/UserMenu";
import AdminMenu from "@/components/AdminMenu";

export default {
  name: "MenuNav",
  components: {AdminMenu, UserMenu},
  setup() {
    return {
      isGuest,
    }
  },
  data() {
    return {
      menu: []
    }
  },
  async mounted() {
    const {data} = await this.$axios.get('/sections')
    this.menu = data.data
  }
}
</script>

<style scoped>

</style>