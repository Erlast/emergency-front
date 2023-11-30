import {defineStore} from "pinia";

export const useCartridgesStore = defineStore('cartridges', {
    state: () => {
        return {
            page: 1,
            itemsPerPage: 10,
            sortBy: [{
                key: 'id',
                order: 'desc'
            }]
        }
    },
    persist: true,

    actions: {
        changePage(value) {
            this.page = value
        },
    },
})