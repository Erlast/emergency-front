<template>
  <v-btn icon="mdi-delete" variant="text" color="black">
    <v-icon icon="mdi-delete"/>
    <Dialog :show="show" @onConfirm="onDelete"/>
  </v-btn>
</template>

<script>
import Dialog from "@/components/DeleteComponent/Dialog";
export default {
  name: "TestComp",
  components:Dialog,
  props: {
    show:
        {type: Boolean, default: false}
  },
  mounted() {

  },
  methods:{
    onDelete(id){
      console.log(id)
    }
  }
}
</script>

<style scoped>

</style>