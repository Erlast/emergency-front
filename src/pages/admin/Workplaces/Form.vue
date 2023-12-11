<template>
  <div class="pa-2">
    <h3 class="mb-2">{{ header }}</h3>

    <v-form ref="form">
      <v-row>
        <v-col
            cols="12"
            md="12"
        >
          <v-text-field label="Имя компьютера" v-model="name" :rules="[v => !!v || 'Имя ПК не может быть пустым']"
                        required
                        density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6"
        >
          <v-autocomplete
              density="compact"
              v-model="ip_id"
              item-value="id"
              item-title="ip_address"
              label="IP"
              :items="ips"
              no-data-text="Нет свободных IP"
              :rules="[v => !!v || 'IP не может быть пустым']"
              required
          >
            <template v-slot:append>
              <add-ip @add="onAddIp"/>
            </template>
          </v-autocomplete>

        </v-col>
        <v-col
            cols="12"
            md="6"
        >
          <v-text-field label="MAC адрес" v-model="mac_address"
                        :rules="[v => !!v || 'МАС адрес не может быть пустым']" required
                        density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6">
          <v-text-field label="Инвентарный номер" v-model="inventory_number"
                        :rules=" [v => !!v || 'Инвентарный номер не может быть пустым']" required
                        density="compact"></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="6">
          <v-text-field label="Серийный номер" v-model="serial_number"
                        :rules="[v => !!v || 'Серийный номер не может быть пустым']" required
                        density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="3">
          <v-autocomplete
              density="compact"
              v-model="department_id"
              item-value="id"
              item-title="name"
              label="Отдел (корпус)"
              :items="departments"
              no-data-text="Нет отделов"
              :rules="[v => !!v || 'Отдел не может быть пустым']"
              required
          >
            <template v-slot:append>
              <add-form-dictionary dictionary="department" @add="onAddDepartment"/>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
            cols="12"
            md="1">
          <v-text-field label="Этаж" v-model="level" :rules="[v => !!v || 'Этаж не может быть пустым']" required
                        density="compact"></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="2">
          <v-text-field label="Помещение" v-model="room" :rules="[v => !!v || 'Помещение не может быть пустым']"
                        required density="compact"></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="2">
          <v-text-field label="Кабинет" v-model="office" :rules="[v => !!v || 'Кабинет не может быть пустым']"
                        required density="compact"></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="4">
          <v-autocomplete
              density="compact"
              v-model="person_id"
              item-value="id"
              item-title="full_name"
              label="Врач"
              :items="persons"
              no-data-text="Нет врачей"
          >
            <template v-slot:append>
              <add-person @add="onAddPerson"/>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6">
          <v-autocomplete
              density="compact"
              v-model="operating_system_id"
              item-value="id"
              item-title="name"
              label="Операционная система"
              :items="operating_systems"
              :rules="[v => !!v || 'Операционная система не может быть пустой']"
              required
              no-data-text="Нет операционной системы"
          >
            <template v-slot:append>
              <add-operating-system @add="onAddOperatingSystem"/>
            </template>
          </v-autocomplete>

        </v-col>
        <v-col
            cols="12"
            md="6">
          <v-text-field label="Серийный номер ОС" v-model="os_serial_number"
                        density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
            cols="12"
            md="6">
          <v-select label="Офис"
                    :items="programming_offices"
                    v-model="programming_office"
                    :rules="[v => !!v || 'Офис не может быть пустым']"
                    required
                    density="compact"
          ></v-select>

        </v-col>
        <v-col
            cols="12"
            md="6">
          <v-text-field label="Серийный номер офиса" v-model="po_serial_number"
                        density="compact"></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="success" class="mt-2" @click="save()">Сохранить</v-btn>

    </v-form>

  </div>
</template>

<script>
import AddIp from "@/components/AddIp";
import AddFormDictionary from "@/components/AddFormDictionary";
import AddPerson from "@/components/AddPerson";
import AddOperatingSystem from "@/components/AddOperatingSystem";

export default {
  name: "WorkplaceForm",
  components: {
    AddIp,
    AddFormDictionary,
    AddPerson,
    AddOperatingSystem
  },
  computed: {
    header() {
      return (!this.$route.params.id) ? 'Добавить ПК' : 'Редактировать ПК'
    }
  },
  data() {
    return {
      ips: [],
      departments: [],
      persons: [],
      operating_systems: [],
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
      name: null,
      ip_id: null,
      department_id: null,
      person_id: null,
      mac_address: null,
      inventory_number: null,
      serial_number: null,
      level: null,
      room: null,
      office: null,
      operating_system_id: null,
      os_serial_number: null,
      programming_office: null,
      po_serial_number: null,
    }
  },
  methods: {
    async save() {
      const {valid} = await this.$refs.form.validate()

      if (valid) {
        await this.$axios.post('/admin/workplace', {
          ip_id: this.ip_id,
          mac_address: this.mac_address,
          inventory_number: this.inventory_number,
          serial_number: this.serial_number,
          name: this.name,
          id: this.$route.params.id ? parseInt(this.$route.params.id) : null,
          person_id: this.person_id,
          department_id: this.department_id,
          level: this.level,
          room: this.room,
          office: this.office,
          operating_system_id: this.operating_system_id,
          os_serial_number: this.os_serial_number,
          programming_office: this.programming_office,
          po_serial_number: this.po_serial_number,
        })

        this.$notify({
          title: 'Информация о ПК сохранена.',
          type: 'success',
        })

        this.$router.push({name: 'Workplaces'})

      }
    },
    async getFreeIps() {
      const {data} = await this.$axios.get(`/admin/free-ips`)
      this.ips = data.data
    },
    async getPersons() {
      const {data} = await this.$axios.get(`/admin/persons`)
      this.persons = data.data
    },
    async getDepartments() {
      const {data} = await this.$axios.get(`/admin/dictionary/department`)
      this.departments = data.data
    },
    async getOperatingSystems() {
      const {data} = await this.$axios.get(`/admin/operating-systems`)
      this.operating_systems = data.data
    },
    async onAddIp() {
      await this.getFreeIps()
    },
    async onAddDepartment() {
      await this.getDepartments()
    },
    async onAddPerson() {
      await this.getPersons()
    },
    async onAddOperatingSystem() {
      await this.getOperatingSystems()
    },
  },
  async mounted() {
    await this.getFreeIps()
    await this.getDepartments()
    await this.getPersons()
    await this.getOperatingSystems()
  }
}
</script>

<style scoped>

</style>