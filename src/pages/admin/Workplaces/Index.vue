<template>
  <v-row class="mb-2 pa-3 justify-end">
    <v-btn color="success" class="mb-2" :to="{name:'Workplace'}">Добавить</v-btn>
    <v-divider></v-divider>
  </v-row>
  <v-row class="mt-2 px-3">
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="getWorkplaces"
        loading-text="Загрузка... подождите"
        :items="workplaces">
      <template #[`item.buttons`]="{ item }">
        <v-btn variant="text" color="success" icon="mdi-pencil"
               :to="{name:'Workplace',params:{id:item.id}}"></v-btn>
        <delete-button :id="item.id" @delete="deleteWorkplace" message="Вы действительно хотите удалить ПК?"
                       url="/admin/workplace/"/>
      </template>
      <template #[`item.department_id`]="{ item }">
        {{ item.department.name }}
      </template>
      <template #[`item.ip_id`]="{ item }">
        {{ item.ip.ip_address }}
      </template>
      <template #[`item.person_id`]="{ item }">
        {{ item.person.full_name }}
      </template>
      <template #[`item.operating_system_id`]="{ item }">
        {{ item.operating_system.name }}
      </template>
      <template #[`item.programming_office`]="{ item }">
        {{ programming_offices.find(i => item.programming_office === i.value).title }}
      </template>
      <template v-slot:no-data>
        Нет данных
      </template>
    </v-data-table>

  </v-row>
</template>

<script>
import DeleteButton from "@/components/DeleteButton";

export default {
  name: "WorkplacesIndex",
  components: {
    DeleteButton
  },
  data() {
    return {
      programming_offices: [
        {
          value: 1,
          title: 'Оpen Оffice',
        },
        {
          value: 2,
          title: 'Microsoft Office',
        },
        {
          value: 3,
          title: 'Libre Office',
        },
      ],
      workplaces: [],
      itemsPerPage: 5,
      headers: [
        {
          title: '#',
          align: 'start',
          sortable: true,
          key: 'id',
        },
        {
          title: 'Инвентарный номер',
          align: 'start',
          sortable: true,
          key: 'inventory_number',
        },
        {title: 'Серийный номер', key: 'serial_number', align: 'start'},
        {title: 'IP адрес', key: 'ip_id', align: 'start'},
        {title: 'Mac адрес', key: 'mac_address', align: 'start'},
        {title: 'Корпус', key: 'department_id', align: 'start'},
        {title: 'Помещение', key: 'room', align: 'start'},
        {title: 'Кабинет', key: 'office', align: 'start'},
        {title: 'Имя ПК', key: 'name', align: 'start'},
        {title: 'Врач', key: 'person_id', align: 'start'},
        {title: 'Операционная система', key: 'operating_system_id', align: 'start'},
        {title: 'Лицензия ОС', key: 'os_serial_number', align: 'start'},
        {title: 'Офис', key: 'programming_office', align: 'start'},
        {title: 'Лицензия офиса', key: 'po_serial_number', align: 'start'},
        {title: '', key: 'buttons', align: 'end'},
      ],
      loading: true,
      totalItems: 0,
    }

  },
  methods: {
    async getWorkplaces() {
      this.loading = true
      const {data} = await this.$axios.get('/admin/workplaces')
      this.workplaces = data.data.workplaces
      this.totalItems = data.data.total
      this.loading = false
    },
    async deleteWorkplace() {
      await this.getWorkplaces()
    }
  },
}
</script>

<style scoped>

</style>