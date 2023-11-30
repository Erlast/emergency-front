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
                    <v-btn v-bind="props" icon="mdi-plus" density="compact" variant="text" class="mr-1"
                           color="cyan-darken-4">
                      <v-icon icon="mdi-plus"/>
                      <v-dialog v-model="dialog" width="500" activator="parent">
                        <v-card>
                          <v-card-title class="text-h5">Добавление раздела или документа</v-card-title>

                          <v-card-text>
                            <div class="mb-2">
                              <v-autocomplete
                                  density="compact"
                                  v-model="type"
                                  item-value="id"
                                  item-title="name"
                                  label="Что добавляем"
                                  :items="types"
                              ></v-autocomplete>
                            </div>
                            <v-text-field
                                density="compact"
                                v-model="name"
                                :label="(type===1)?'Наименование раздела':'Наименование документа'"
                                required
                            ></v-text-field>

                            <v-text-field
                                v-if="type===2"
                                density="compact"
                                v-model="url"
                                label="Ссылка"
                                required
                            ></v-text-field>
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text @click="dialog = false">Отмена</v-btn>
                            <v-btn color="red" text @click="makeFolder()">Добавить</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-btn>
                  </template>
                </v-tooltip>
              </div>
            </template>
          </v-list-item>
        </template>
        <tree-item class="item" v-for="(child,key) in modelValue" :key="key" :item="child" @make-folder="makeFolder"
                   @add-item="addItem"/>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import TreeItem from "@/components/JTreeView/TreeItem";
import {deepClone} from "@/utils";

export default {
  name: "JTreeView",
  components: {
    TreeItem
  },
  props: {
    modelValue: Object
  },
  data() {
    return {
      open: 'My Tree',
      dialog: false,
      name: null,
      url: null,
      type: 1,
      types: [
        {
          id: 1,
          name: 'Раздел',
        },
        {
          id: 2,
          name: 'Документ',
        }
      ]
    }
  },
  methods: {
    makeFolder: function () {
      const items = deepClone(this.modelValue)

      items.push({
        name: this.name,
        url: this.url,
        isDir: (this.type === 1),
        id: this.name + Math.random()
      })
      this.name = null
      this.dialog = false
      this.type = 1
      this.url = null
      this.$emit('update:modelValue', items)
      //  item.children = [];
      //this.addItem(item);
    },
    addItem: function (item) {
      item.children.push({
        name: this.name,
        isDir: true,
        id: this.name + Math.random()
      });
      this.$emit('update', this.items)
    }
  }
}
</script>

<style scoped>

</style>