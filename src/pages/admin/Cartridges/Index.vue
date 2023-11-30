<template>
  <v-row class="mb-2 pa-3 justify-end">
    <v-btn color="success" class="mb-2" :to="{name:'CartridgeForm'}">Добавить</v-btn>
    <v-divider></v-divider>
  </v-row>
  <v-row class="mt-2 px-3">
    <v-data-table-server
        v-model:items-per-page="cartridgesStore.itemsPerPage"
        v-model:sort-by="cartridgesStore.sortBy"
        v-model:page="cartridgesStore.page"
        :headers="headers"
        :items-length="totalItems"
        :items="cartridges"
        :loading="loading"
        item-value="id"
        items-per-page-text="На странице"
        :page-text="pageText"
        @update:options="getCartridges"
        loading-text="Загрузка... подождите"
    >
      <template #[`item.buttons`]="{ item }">
        <v-btn variant="text" color="success" icon="mdi-pencil"
               :to="{name:'CartridgeForm',params:{id:item.id}}"></v-btn>
      </template>
      <template #[`item.type`]="{ item }">
        {{ item.brand.name }}
      </template>
      <template #[`item.printer_model`]="{ item }">
        {{ item.printer_model.name }}
      </template>
      <template #[`item.department_id`]="{ item }">
        {{ (item.department) ? item.department.name : '' }}
      </template>
      <template #[`item.status`]="{ item }">
        <v-chip color="success" variant="flat" v-if="item.status===1" size="small">
          На складе
        </v-chip>
        <v-chip color="secondary" variant="flat" v-if="item.status===2" size="small">
          На заправке
        </v-chip>
        <v-chip color="primary" variant="flat" v-if="item.status===3" size="small">
          В отделе
        </v-chip>
        <v-chip color="red" variant="flat" v-if="item.status===4" size="small">
          Списан
        </v-chip>
      </template>
      <template v-slot:no-data>
        Нет данных
      </template>
    </v-data-table-server>

  </v-row>
</template>

<script>
import {useCartridgesStore} from '@/stores/cartridges'

export default {
  name: "CartridgeIndex",
  setup() {
    const cartridgesStore = useCartridgesStore()

    return {
      cartridgesStore
    }
  },
  data() {
    return {
      cartridges: [],
      headers: [
        {
          title: '#',
          align: 'start',
          sortable: true,
          key: 'id',
        },
        {
          title: 'Штрих код',
          align: 'start',
          sortable: true,
          key: 'sh_code',
        },
        {title: 'Тип', key: 'type', align: 'start'},
        {title: 'Модель', key: 'printer_model', align: 'start'},
        {title: 'Статус', key: 'status', align: 'start'},
        {title: 'Отдел', key: 'department_id', align: 'start'},
        {title: '', key: 'buttons', align: 'end'},
      ],
      loading: true,
      totalItems: 0
    }
  },
  computed: {
    pageText() {
      let lastRecord = this.cartridgesStore.itemsPerPage * this.cartridgesStore.page
      if (lastRecord > this.totalItems)
        lastRecord = this.totalItems
      return ((this.cartridgesStore.page - 1) * this.cartridgesStore.itemsPerPage + 1) + '-' + lastRecord + ' из ' + this.totalItems
    }
  },
  methods: {
    async getCartridges({page, sortBy}) {
      this.loading = true

      const params = {
        page: page,
        perPage: this.cartridgesStore.itemsPerPage
      }

      if (sortBy.length) {
        params.sort = {
          value: sortBy[0].key,
          desc: sortBy[0].order === 'desc'
        }
      }

      const {data} = await this.$axios.get('/admin/cartridges', {
        params: params
      })

      this.cartridges = data.data.cartridges
      this.totalItems = data.data.total
      this.loading = false
    },
  },
}
</script>

<style scoped>

</style>