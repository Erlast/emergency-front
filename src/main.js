import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import {api} from "@/boot/axios";
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import '/src/assets/css/main.css'
import moment from 'moment'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import CKEditor from "@ckeditor/ckeditor5-vue";

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
    },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(CKEditor)
app.use(pinia)

app.config.globalProperties.$axios = api
app.config.globalProperties.$moment = moment

app.mount('#app')
