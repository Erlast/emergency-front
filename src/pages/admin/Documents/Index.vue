<template>
  <j-tree-view v-model="items" @addItem="addItem" @delete-item="deleteItem"/>
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
    async getTree() {
      const {data} = await this.$axios.get('/admin/sections')

      this.items = data.data
    },
    async addItem(item) {

      if (item.is_dir) {
        await this.$axios.post('/admin/section', item)
      } else {
        let formData = new FormData();
        let file = null
        if (item.file[0] instanceof File) {
          file = item.file[0]
        } else {
          file = item.file
        }

        formData.append('file', file);
        formData.append('name', item.name)
        formData.append('p_id', item.p_id)
        formData.append('id', item.id)
        await this.$axios.post('/admin/document', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      }
      await this.getTree()
    },
    async deleteItem() {
      await this.getTree()
    }
  },
  async mounted() {
    await this.getTree()
  }

}
</script>

<style scoped>

</style>