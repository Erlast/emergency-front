<template>
  <v-row class="mb-2 pa-3 justify-end" v-if="user().role===ADMIN_ROLE">
    <v-btn color="success" class="mb-2" :to="{name:'Workplace'}">Добавить</v-btn>
    <v-btn color="amber-darken-1" class="mb-2 ml-2" :to="{name:'FreeIP'}">Свободные IP</v-btn>
    <v-divider></v-divider>
  </v-row>
  <v-row class="mt-2 px-3">
    <v-data-table
        density="compact"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="getWorkplaces"
        loading-text="Загрузка... подождите"
        :items="workplaces"
        items-per-page-text="На странице"
    >
      <template #[`item.buttons`]="{ item }" v-if="user().role===ADMIN_ROLE">
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
      <template v-slot:top>
        <v-row>
          <v-col
              cols="12"
              md="3">
            <v-text-field
                v-model="search.inventory_number"
                label="Инвентарный номер"
                class="pa-2"
                density="compact"
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="3">
            <v-text-field
                v-model="search.ip"
                label="IP"
                class="pa-2"
                density="compact"
            ></v-text-field>
          </v-col>
          <v-col
              cols="12"
              md="3">
            <v-autocomplete
                density="compact"
                v-model="search.department_id"
                item-value="id"
                item-title="name"
                label="Отдел (корпус)"
                :items="departments"
                no-data-text="Нет отделов"
                class="pa-2"
            >
            </v-autocomplete>
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <div class="pa-2 d-flex">
              <v-btn color="success" @click="getWorkplaces">Найти</v-btn>
              <v-btn color="default" @click="resetFilters" class="ml-2">Сбросить</v-btn>
            </div>
          </v-col>

        </v-row>
      </template>
    </v-data-table>

  </v-row>
</template>

<script>
import DeleteButton from "@/components/DeleteButton";
import {user, ADMIN_ROLE} from "@/utils/auth";

export default {
  name: "WorkplacesIndex",
  components: {
    DeleteButton
  },
  data() {
    return {
      user,
      ADMIN_ROLE,
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
      departments: [],
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
        {title: '', key: 'buttons', align: 'end', sortable: false},
      ],
      loading: true,
      totalItems: 0,
      search: {
        inventory_number: null,
        ip: null,
        department_id: null
      }
    }

  },
  methods: {
    async getWorkplaces() {
      this.loading = true
      const params = {
        filters: this.search
      }
      const {data} = await this.$axios.get('/admin/workplaces', {params: params})
      this.workplaces = data.data.workplaces
      this.totalItems = data.data.total
      this.loading = false
    },
    async deleteWorkplace() {
      await this.getWorkplaces()
    },
    async getDepartments() {
      const {data} = await this.$axios.get(`/admin/dictionary/department`)
      this.departments = data.data
    },
    resetFilters() {
      this.search = {
        inventory_number: null,
        ip: null,
        department_id: null
      }
      this.getWorkplaces()
    }
  },
  async mounted() {
    await this.getDepartments()
  }
}
</script>

<style scoped>

</style>