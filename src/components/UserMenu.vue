<template>
  <v-list-item
      :prepend-avatar="img"
      :title="user().name"
      :subtitle="user().email"
  >
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-menu-down" variant="text" size="small" v-bind="props"></v-btn>
        </template>

        <v-list>
          <v-list-item-title>
            <v-btn text @click="logoutHandle">Выход</v-btn>
          </v-list-item-title>
        </v-list>
      </v-menu>

    </template>
  </v-list-item>
</template>

<script>
import {user, logout} from "@/utils/auth";
import img from "@/assets/images/User-Avatar-in-Suit-PNG.png";

export default {
  name: "UserMenu",
  setup() {
    return {
      user,
      img,
    }
  },
  methods: {
    async logoutHandle() {
      await logout()
      this.$router.go()
    },
  }

}
</script>

<style scoped>

</style>