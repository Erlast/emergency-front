import {defineStore} from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            draw: true
        }
    },
    persist: true,

    actions: {
        toggleDraw() {
            this.draw = !this.draw
        },
    },
})