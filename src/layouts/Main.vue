<script setup>
import {RouterView} from 'vue-router'
import MenuNav from "@/components/MenuNav";
</script>

<template>
  <v-layout class="rounded rounded-md">
    <v-system-bar color="cyan-darken-3" window>
      <v-icon icon="mdi-cellphone"/>
      <span>Отдел компьютерного обеспечения: Тел. 354-64-20. внутр. 251 - по вопросам МИС; 333 - по работе ПК; 378 - электронные подписи</span>
      <v-spacer></v-spacer>
      <span class="ms-2">08:30</span>
    </v-system-bar>

    <v-navigation-drawer
        color="cyan-darken-1"
        permanent
        width="250"
        v-model="drawer"
    >
      <menu-nav></menu-nav>
    </v-navigation-drawer>

    <v-app-bar color="cyan-darken-1" height="48" flat>
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-main
        class=""
        style="min-height: 300px; "
    >
      <div style="padding: 10px">
        <RouterView/>
      </div>
    </v-main>
  </v-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data: () => ({
    drawer: false,
  })
}
</script>

<style scoped>

</style>