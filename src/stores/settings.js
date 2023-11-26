import {defineStore} from "pinia";

export const useSettingsStore = defineStore('settings', {
    state: () => {
        return {
            draw: true,
            stayOnCartridgeForm: false
        }
    },
    persist: true,

    actions: {
        toggleDraw() {
            this.draw = !this.draw
        },
        toggleStayOnCartridgeForm() {
            this.stayOnCartridgeForm = !this.stayOnCartridgeForm
        },
    },
})