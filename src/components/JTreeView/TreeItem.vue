<template>
  <v-list-item v-if="!isFolder" :prepend-icon="(item.isDir)?'mdi-folder':'mdi-file'" :title="item.name"
               @dblclick="makeFolder">
    <template v-slot:title>
      <div class="d-flex flex-row align-center">
        <span class="mr-2">{{ item.name }}</span>
        <v-tooltip text="Добавить раздел или документ" location="top">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus" density="compact" variant="text" class="mr-1" color="cyan-darken-4"
                   v-if="item.isDir"/>
          </template>
        </v-tooltip>
        <v-btn icon="mdi-pencil" density="compact" variant="text" class="mr-1" color="success"></v-btn>
        <v-btn icon="mdi-delete" density="compact" variant="text" color="purple-darken-4"></v-btn>
      </div>
    </template>
  </v-list-item>
  <v-list-group :value="item.id" v-if="isFolder" @dblclick="makeFolder">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          :prepend-icon="(item.isDir)?'mdi-folder':'mdi-file'"
      >
        <template v-slot:title>
          <div class="d-flex flex-row align-center">
            <span class="mr-2">{{ item.name }}</span>
            <v-tooltip text="Добавить раздел или документ" location="top">
              <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon="mdi-plus" density="compact" variant="text" class="mr-1" color="cyan-darken-4"
                   v-if="item.isDir"/>
              </template>
            </v-tooltip>
            <v-btn icon="mdi-pencil" density="compact" variant="text" class="mr-1" color="success"></v-btn>
            <v-btn icon="mdi-delete" density="compact" variant="text" color="purple-darken-4"></v-btn>
          </div>
        </template>
      </v-list-item>
    </template>
    <tree-item v-for="(child,key) in item.children" :key="key" :item="child"/>
  </v-list-group>
  <!--    <div-->
  <!--        :class="{bold: isFolder}"-->
  <!--        @click="toggle"-->
  <!--        @dblclick="makeFolder">-->
  <!--      {{ item.name }}-->
  <!--      <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>-->
  <!--    </div>-->
  <!--    <ul v-show="isOpen" v-if="isFolder">-->
  <!--      <tree-item-->
  <!--          class="item"-->
  <!--          v-for="(child, index) in item.children"-->
  <!--          :key="index"-->
  <!--          :item="child"-->
  <!--          @make-folder="$emit('make-folder', $event)"-->
  <!--          @add-item="$emit('add-item', $event)"-->
  <!--      ></tree-item>-->
  <!--      <li class="add" @click="$emit('add-item', item)">+</li>-->
  <!--    </ul>-->

</template>

<script>
export default {
  name: "TreeItem",
  props: {
    item: Object
  },
  data: function () {
    return {
      isOpen: false
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    }
  }

}
</script>

<style scoped>

</style>