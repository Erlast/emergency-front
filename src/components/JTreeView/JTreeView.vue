<template>
  <v-card
      max-width="900"
  >
    <v-list v-model:opened="open" density="compact">
      <v-list-group value="root">
        <template v-slot:activator="{ props }">
          <v-list-item
              v-bind="props"
              prepend-icon="mdi-folder"
          >
            <template v-slot:title>
              <div class="d-flex flex-row align-center">
                <span class="mr-2">Основной раздел</span>
                <v-tooltip text="Добавить раздел или документ" location="top">
                  <template v-slot:activator="{ props }">
                    <tree-add-item :props="props" @addItem="addItem" :item="{}"/>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-list-item>
        </template>
        <tree-item v-for="(child,key) in modelValue" :key="key" :item="child"
                   @add-item="addItem" @delete-item="deleteItem"/>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import TreeItem from "@/components/JTreeView/TreeItem";
import TreeAddItem from "@/components/JTreeView/TreeAddItem";

export default {
  name: "JTreeView",
  components: {
    TreeAddItem,
    TreeItem
  },
  props: {
    modelValue: Object
  },
  data() {
    return {
      open: ['root'],
    }
  },
  methods: {
    addItem: function (item) {
      this.$emit('addItem', item)
    },
    deleteItem() {
      this.$emit('deleteItem')
    },
  }
}
</script>

<style scoped>

</style>