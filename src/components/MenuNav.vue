<template>
  <v-list nav>

    <v-list-item-title class="d-flex justify-center mb-3"><h1>ГКБ №34</h1></v-list-item-title>
    <user-menu v-if="!isGuest()"/>
    <v-divider></v-divider>
    <v-list-item prepend-icon="mdi-home" to="/" exact title="Главная"></v-list-item>
    <v-list-item prepend-icon="mdi-folder" to="/mis-nso" exact title="МИС НСО"></v-list-item>
    <v-list-item prepend-icon="mdi-folder" to="eln" title="ЭЛН"></v-list-item>
    <v-list-item prepend-icon="mdi-hospital-building" title="Поликлиника"></v-list-item>
    <v-list-item prepend-icon="mdi-file-document" title="Приказы/Инструкции"></v-list-item>
    <v-list-item prepend-icon="mdi-folder" title="IT отдел"></v-list-item>
    <v-list-item prepend-icon="mdi-text-box" title="Бланки"></v-list-item>
    <v-list-item prepend-icon="mdi-video" title="Видео"></v-list-item>
    <v-list-item prepend-icon="mdi-folder" title="Телемедицина"></v-list-item>
    <v-list-item prepend-icon="mdi-human-queue" title="Кадры"></v-list-item>
    <v-list-item prepend-icon="mdi-medication" title="Аптека"></v-list-item>
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
  }
}
</script>

<style scoped>

</style>