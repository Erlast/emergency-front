import {defineStore, mapStores, mapState, mapActions} from 'pinia'

const settings = defineStore('settings', {
    state: () => {
        return {draw: true}
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        toggleDraw() {
            this.draw = !this.draw
        },
    },
})

export default {
    computed: {
        // other computed properties
        // ...
        // gives access to this.counterStore and this.userStore
        ...mapStores(settings),
        // gives read access to this.count and this.double
        ...mapState(settings, ['draw']),
    },
    methods: {
        // gives access to this.increment()
        ...mapActions(settings, ['toggleDraw']),
    },
}