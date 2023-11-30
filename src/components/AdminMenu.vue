<template>
  <v-divider></v-divider>
  <v-list-subheader>Админ меню</v-list-subheader>
  <v-list-item prepend-icon="mdi-home" :to="{name:'News'}" exact title="Новости"
               v-if="user().role===ADMIN_ROLE"></v-list-item>
  <v-list-item prepend-icon="mdi-paper-roll" :to="{name:'Cartridges'}" exact title="Картриджи"
               v-if="user().role===ADMIN_ROLE"></v-list-item>
  <v-list-item prepend-icon="mdi-account-group" :to="{name:'Users'}" exact title="Пользователи"
               v-if="user().role===ADMIN_ROLE"></v-list-item>
  <v-list-item prepend-icon="mdi-file-document-multiple" :to="{name:'Documents'}" exact title="Документы"
               v-if="user().role===ADMIN_ROLE"></v-list-item>
  <v-list-item prepend-icon="mdi-desktop-tower-monitor" :to="{name:'WorkStations'}" exact title="ПК"></v-list-item>
</template>

<script>
import {user, ADMIN_ROLE} from "@/utils/auth";

export default {
  name: "AdminMenu",
  setup() {
    return {
      user,
      ADMIN_ROLE
    }
  }
}
</script>

<style scoped>

</style>