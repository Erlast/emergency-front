<template>
  <div class="pa-2">
    <h3 class="mb-2">{{ header }}</h3>

    <div>
      <v-form ref="form">
        <div class="mb-2">
          <v-autocomplete
              density="compact"
              v-model="brand_id"
              item-value="id"
              item-title="name"
              label="Производитель"
              :items="brands"
          >
            <template v-slot:append>
              <add-form-dictionary dictionary="brand" @add="onAdd"/>

            </template>
          </v-autocomplete>
        </div>
        <div class="mb-2">
          <v-autocomplete
              density="compact"
              v-model="model_id"
              item-value="id"
              item-title="name"
              label="Модель принтер"
              :items="printerModels"
          >
            <template v-slot:append>
              <add-form-dictionary dictionary="printerModel" @add="onAdd"/>
            </template>
          </v-autocomplete>
        </div>
        <div class="mb-2">
          <v-autocomplete
              density="compact"
              :disabled="isDisabled"
              v-model="status"
              item-value="id"
              item-title="name"
              label="Статус"
              :items="statuses"
              @update:modelValue="changeStatus"
          ></v-autocomplete>
        </div>
        <div class="mb-2" v-if="status===3">
          <v-autocomplete
              density="compact"
              v-model="department_id"
              item-value="id"
              item-title="name"
              label="Отдел"
              :items="departments"
          >
            <template v-slot:append>
              <add-form-dictionary dictionary="department" @add="onAdd"/>
            </template>
          </v-autocomplete>
        </div>
        <div class="mb-2">
          <v-text-field label="Штрих-код" v-model="sh_code" :rules="shCodeRules" required
                        density="compact" ref="sh_code" @keydown.enter="save"></v-text-field>
        </div>
        <div class="mb-2">
          <v-checkbox label="После сохранения остаться на форме"
                      v-model="settingsStore.stayOnCartridgeForm"></v-checkbox>
        </div>
        <v-btn color="success" class="mt-2" @click="save()">Сохранить</v-btn>
      </v-form>
    </div>
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        color="success"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
            color="white"
            variant="text"
            @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {useSettingsStore} from '@/stores/settings'
import AddFormDictionary from "@/components/AddFormDictionary";

export default {
  name: "CartridgeForm",
  components: {AddFormDictionary},
  setup() {
    const settingsStore = useSettingsStore()

    return {
      settingsStore
    }
  },
  data() {
    return {
      shCodeRules: [
        v => !!v || 'Штрих-код не может быть пустым',
      ],
      model_id: null,
      brand_id: null,
      department_id: null,
      sh_code: '',
      status: 1,
      brands: [],
      printerModels: [],
      departments: [],
      statuses: [
        {
          id: 1,
          name: 'Склад',
        },
        {
          id: 2,

          name: 'Заправка'
        },
        {
          id: 3,
          name: 'Отдел'
        },
        {
          id: 4,
          name: 'Списан'
        }
      ],
      snackbar: false,
      text: 'Сообщение',
      timeout: 2000,
    }
  },
  computed: {
    header() {
      return (!this.$route.params.id) ? 'Добавить картридж' : 'Редактировать картридж'
    },
    isDisabled() {
      return !this.$route.params.id
    }
  },
  methods: {
    async save() {

      const {valid} = await this.$refs.form.validate()

      if (valid) {
        await this.$axios.post('/admin/cartridge', {
          brand_id: this.brand_id,
          model_id: this.model_id,
          sh_code: this.sh_code,
          status: this.status,
          department_id: this.department_id,
          id: this.$route.params.id ? parseInt(this.$route.params.id) : null
        })

        this.text = 'Информация о картридже сохранена.'
        this.snackbar = true

        if (!this.settingsStore.stayOnCartridgeForm) {
          this.$router.push({name: 'Cartridges'})
        } else {
          this.sh_code = null
          this.$refs.sh_code.focus()

        }

      }

    },
    changeStatus(item) {
      if (item !== 3) {
        this.department_id = null
      }
    },
    async onAdd(dictionary) {
      switch (dictionary) {
        case 'brand':
          await this.getBrands()
          break;
        case 'printerModel':
          await this.getPrinterModels()
          break;
        case 'department':
          await this.getDepartments()
          break;
      }
    },
    async getBrands() {
      const {data} = await this.$axios.get(`/admin/dictionary/brand`)
      this.brands = data.data
    },
    async getPrinterModels() {
      const {data} = await this.$axios.get(`/admin/dictionary/printerModel`)
      this.printerModels = data.data
    },
    async getDepartments() {
      const {data} = await this.$axios.get(`/admin/dictionary/department`)
      this.departments = data.data
    },
    async getCartridge() {
      if (this.$route.params.id) {
        const {data} = await this.$axios.get(`/admin/cartridge/${this.$route.params.id}`)

        this.brand_id = data.data.brand_id
        this.model_id = data.data.model_id
        this.sh_code = data.data.sh_code
        this.department_id = data.data.department_id
        this.status = data.data.status

      }
    }
  },
  async mounted() {
    await this.getBrands()
    await this.getPrinterModels()
    await this.getDepartments()
    await this.getCartridge()
  }
}
</script>

<style scoped>

</style>