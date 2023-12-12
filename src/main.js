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
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Notifications from '@kyvg/vue3-notification'
import {Vue3ProgressPlugin} from '@marcoschulte/vue3-progress';
import Vue3VideoPlayer from '@cloudgeek/vue3-video-player'
import '@cloudgeek/vue3-video-player/dist/vue3-video-player.css'
import ru from '@/lang/ru'
import {vMaska} from 'maska'
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
app.use(Notifications)
app.use(Vue3ProgressPlugin)
app.use(Vue3VideoPlayer, {
    lang: ru
})
app.directive("maska", vMaska)

app.config.globalProperties.$axios = api
app.config.globalProperties.$moment = moment

app.mount('#app')
