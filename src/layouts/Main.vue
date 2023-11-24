<template>
  <v-layout class="rounded rounded-md">
    <v-system-bar color="cyan-darken-3" window>
      <v-icon icon="mdi-cellphone"/>
      <span>Отдел компьютерного обеспечения: Тел. 354-64-20. внутр. 251 - по вопросам МИС; 333 - по работе ПК; 378 - электронные подписи</span>
      <v-spacer></v-spacer>
      <span class="ms-2">
        <clock-component/>
      </span>
    </v-system-bar>

    <v-navigation-drawer
        color="cyan-lighten-5"
        permanent
        width="250"
        v-model="settingsStore.draw"
    >
      <menu-nav></menu-nav>
    </v-navigation-drawer>

    <v-app-bar color="cyan-lighten-5" height="48" flat>
      <v-app-bar-nav-icon variant="text" @click.stop="settingsStore.toggleDraw()"></v-app-bar-nav-icon>
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
import {defineComponent} from "vue";
import {useSettingsStore} from '@/stores/settings'
import {RouterView} from 'vue-router'
import MenuNav from "@/components/MenuNav";
import ClockComponent from "@/components/Clock";

export default defineComponent({
  name: "MainLayout",
  components: {
    RouterView,
    MenuNav,
    ClockComponent
  },
  setup() {
    const settingsStore = useSettingsStore()

    return {
      settingsStore
    }
  },
  data: () => ({
    //drawer: true,
  })
})
</script>

<style scoped>

</style>