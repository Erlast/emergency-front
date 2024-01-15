<template>
  <v-row class="mt-2 px-3">
    <v-data-table
        density="compact"
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="totalItems"
        :loading="loading"
        item-value="id"
        @update:options="getFreeIps"
        loading-text="Загрузка... подождите"
        :items="ips"
        items-per-page-text="На странице"
    >
      <template #[`item.buttons`]="{ item }" >
        <delete-button :id="item.id" @delete="deleteIp" message="Вы действительно хотите удалить IP?"
                       url="/admin/ip/"/>
      </template>

      <template v-slot:no-data>
        Нет данных
      </template>
      <template v-slot:top>
        <v-row>
          <v-col
              cols="12"
              md="3">
            <v-autocomplete
                density="compact"
                v-model="search.ip_address"
                item-value="id"
                item-title="name"
                label="Диапазон"
                :items="prefixes"
                no-data-text="Нет диапазонов"
                class="pa-2"
            >
            </v-autocomplete>
          </v-col>
          <v-col
              cols="12"
              md="3"
          >
            <div class="pa-2 d-flex">
              <v-btn color="success" @click="getFreeIps">Найти</v-btn>
              <v-btn color="default" @click="resetFilters" class="ml-2">Сбросить</v-btn>
            </div>
          </v-col>

        </v-row>
      </template>
    </v-data-table>

  </v-row>
</template>

<script>

export default {
  name: "IPList",
  data() {
    return {
      prefixes: [
        {
          value: 36,
          title: '10.174.36.*',
        },
        {
          value: 37,
          title: '10.174.37.*',
        },
        {
          value: 38,
          title: '10.174.38.*',
        },
        {
          value: 39,
          title: '10.174.39.*',
        },
      ],
      ips: [],
      itemsPerPage: 5,
      headers: [
        {
          title: '#',
          align: 'start',
          sortable: true,
          key: 'id',
        },
        {
          title: 'IP адрес',
          align: 'start',
          sortable: true,
          key: 'ip_address',
        },
        {title: '', key: 'buttons', align: 'end', sortable: false},
      ],
      loading: true,
      totalItems: 0,
      search: {
        ip_address: null,
      }
    }

  },
  methods: {
    async getFreeIps() {
      const {data} = await this.$axios.get('/admin/free-ips')
      this.ips = data.data
    },
    async resetFilters() {
      this.search = {
        ip_address: null,
      }
      await this.getFreeIps()
    }
  }
}
</script>

<style scoped>

</style>