<template>
  <v-list-item v-if="!isFolder" :prepend-icon="item.is_dir?(item.is_share?'mdi-folder-eye':'mdi-folder'):'mdi-file'"
               :title="item.name"
               @dblclick="makeFolder">
    <template v-slot:title>
      <div class="d-flex flex-row align-center" @contextmenu="onContextMenu($event)">
        <span class="mr-2">{{ item.name }}</span>
        <v-tooltip text="Добавить" location="top">
          <template v-slot:activator="{ props }">
            <tree-add-item :props="props" @addItem="addItem" v-if="item.is_dir && !item.is_share" :item="item"/>
          </template>
        </v-tooltip>
        <v-tooltip text="Редактировать" location="top">
          <template v-slot:activator="{ props }">
            <tree-add-item :props="props" @addItem="addItem" icon="mdi-pencil" color="success" action="edit"
                           :item="item"/>
          </template>
        </v-tooltip>

        <delete-button :title="(item.is_dir)?'Удалить раздел?':'Удалить документ?'"
                       :url="(item.is_dir)?'/admin/section/':'/admin/document/'"
                       :id="item.id"
                       @delete="deleteItem"
                       color-button="purple-darken-4"
                       density="compact"
                       :message="(item.is_dir)?'Вы точно хотите удалить раздел? Все его подразделы и документы будут удалены.':'Вы точно хотите удалить документ?'"></delete-button>

      </div>
    </template>
  </v-list-item>
  <v-list-group :value="item._id" v-if="isFolder" @dblclick="makeFolder">
    <template v-slot:activator="{ props }">
      <v-list-item
          v-bind="props"
          :prepend-icon="item.is_dir?(item.is_share?'mdi-folder-eye':'mdi-folder'):'mdi-file'"
      >
        <template v-slot:title>
          <div class="d-flex flex-row align-center">
            <span class="mr-2">{{ item.name }}</span>
            <v-tooltip text="Добавить раздел или документ" location="top">
              <template v-slot:activator="{ props }">
                <tree-add-item :props="props" @addItem="addItem" v-if="item.is_dir && !item.is_share" :item="item"
                               :parent-id="item.id"/>
              </template>
            </v-tooltip>
            <v-tooltip text="Редактировать" location="top">
              <template v-slot:activator="{ props }">
                <tree-add-item :props="props" @addItem="addItem" icon="mdi-pencil" color="success" action="edit"
                               :item="item"/>
              </template>
            </v-tooltip>
            <delete-button :title="(item.is_dir)?'Удалить раздел?':'Удалить документ?'"
                           :url="(item.is_dir)?'/admin/section/':'/admin/document/'"
                           :id="item.id"
                           @delete="deleteItem"
                           color-button="purple-darken-4"
                           density="compact"
                           :message="(item.is_dir)?'Вы точно хотите удалить раздел? Все его подразделы и документы будут удалены.':'Вы точно хотите удалить документ?'"></delete-button>

          </div>
        </template>
      </v-list-item>
    </template>
    <tree-item v-for="(child,key) in item.children" :key="key" :item="child" @add-item="addItem"
               @delete-item="deleteItem"/>
  </v-list-group>
</template>

<script>
import TreeAddItem from "@/components/JTreeView/TreeAddItem";
import DeleteButton from "@/components/DeleteComponent/Index";
import ContextMenu from '@imengyu/vue3-context-menu'
import {h} from 'vue'
//import DeleteDialogComponent from '@/components/DeleteComponent/Dialog'
import TestComp from '@/components/DeleteComponent/TestComp'

export default {
  name: "TreeItem",
  components: {
    TreeAddItem,
    DeleteButton,
  },
  props: {
    item: Object
  },
  emits: ['addItem', 'deleteItem'],
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
    addItem(item) {
      this.$emit('addItem', item);
    },
    async deleteItem(id) {
      this.$emit('deleteItem', id)
    },
    makeFolder: function () {
      if (!this.isFolder) {
        //this.$emit("make-folder", this.item);
        this.isOpen = true;
      }
    },
    onContextMenu(e) {
      //prevent the browser's default menu
      e.preventDefault();
      //show your menu
      ContextMenu.showContextMenu({
            x: e.x,
            y: e.y,
            items: [
              {
                label: "Добавить",
                icon: 'mdi-plus mdi',
                onClick: () => {
                  console.log("You click a menu item");
                }
              },
              {
                label: "Редактировать",
                icon: 'mdi mdi-pencil',
                divided: true,
                onClick: () => {
                  console.log('here')
                }
              },
              {
                label: "Удалить",
                name: 'delete',
                icon: 'mdi mdi-delete',
                customRender: (item) => {
                  console.log(item)
                  return h(TestComp,{show:false})
                }
              }
            ]
          },
      );
    }
  }

}
</script>

<style scoped>

</style>