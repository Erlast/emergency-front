<template>
  <span>{{ currentTime }}</span>
</template>

<script>
import moment from "moment";

export default {
  name: "ClockComponent",
  setup() {
    moment.locale('ru')
    const getCurrentTime = () => moment().format("D MMM HH:mm:ss");
    return {
      getCurrentTime
    }
  },
  data() {
    return {
      currentTime: this.getCurrentTime()
    }
  },
  methods: {
    updateCurrentTime() {
      this.currentTime = this.getCurrentTime();
    }
  },
  created() {
    setInterval(() => this.updateCurrentTime(), 1000);
  }
}
</script>

<style scoped>

</style>