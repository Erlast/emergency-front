<template>
  <v-row class="mb-2 pa-3 justify-end">
    <v-btn color="success" class="mb-2" :to="{name:'UserForm'}">Добавить</v-btn>
    <v-divider></v-divider>
  </v-row>
  <v-row class="mt-2 px-3">
    <v-data-table
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="getUsers"
        loading-text="Загрузка... подождите"
        :items="users">
      <template #[`item.buttons`]="{ item }">
        <v-btn variant="text" color="success" icon="mdi-pencil"
               :to="{name:'UserForm',params:{id:item.id}}"></v-btn>
        <delete-button :id="item.id" @delete="deleteUser" message="Вы действительно хотите удалить пользователя?"
                       url="/admin/user/"/>
      </template>
      <template #[`item.created_at`]="{ item }">
        {{ (item.created_at) ? $moment(item.created_at).format('DD.MM.YYYY HH:mm:ss') : '' }}
      </template>
      <template #[`item.role`]="{ item }">
        <v-chip color="success" variant="flat" v-if="item.role===1" size="small">
          Пользователь
        </v-chip>
        <v-chip color="secondary" variant="flat" v-if="item.role===2" size="small">
          Администратор
        </v-chip>
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
  name: "UsersIndex",
  components: {DeleteButton},
  data() {
    return {
      users: [],
      itemsPerPage: 5,
      headers: [
        {
          title: '#',
          align: 'start',
          sortable: true,
          key: 'id',
        },
        {
          title: 'Имя',
          align: 'start',
          sortable: true,
          key: 'name',
        },
        {title: 'E-mail', key: 'email', align: 'start'},
        {title: 'Права', key: 'role', align: 'start'},
        {title: 'Добавлен', key: 'created_at', align: 'start'},
        {title: '', key: 'buttons', align: 'end'},
      ],
      loading: true,
      totalItems: 0,
    }

  },
  methods: {
    async getUsers() {
      this.loading = true
      const {data} = await this.$axios.get('/admin/users')
      this.users = data.data.users
      this.totalItems = data.data.total
      this.loading = false
    },
    async deleteUser() {
      await this.getUsers()
    }
  },

}
</script>

<style scoped>

</style>