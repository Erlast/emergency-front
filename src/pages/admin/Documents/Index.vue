<template>
  <j-tree-view v-model="items" />
</template>

<script>

import JTreeView from "@/components/JTreeView/JTreeView";

export default {
  name: "DocumentsIndex",
  components: {JTreeView},
  data() {
    return {
      config: {
        roots: ["id1", "id2"],
      },
      items: []
    }
  },
  methods: {
    updateTree(tree) {
      console.log(tree)
      this.tree = tree
    }
  }

}
</script>

<style scoped>

</style>