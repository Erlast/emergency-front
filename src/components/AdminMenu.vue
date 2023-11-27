<template>
  <v-divider></v-divider>
  <v-list-subheader>Админ меню</v-list-subheader>
  <v-list-item prepend-icon="mdi-home" :to="{name:'News'}" exact title="Новости"></v-list-item>
  <v-list-item prepend-icon="mdi-paper-roll" :to="{name:'Cartridges'}" exact title="Картриджи"></v-list-item>
</template>

<script>
export default {
  name: "AdminMenu"
}
</script>

<style scoped>

</style>