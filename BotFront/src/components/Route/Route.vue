<script>
import IcaoInput from "@/components/Route/IcaoInput.vue";
import axios from "axios";

export default {
  name: "Weather",
  components: {
    IcaoInput,

  },
  data() {
    return {
      weatherData: null
    }
  },
  methods: {
    goToView(dep, app) {
      this.$router.push({name: "RouteDetail", params: {dep: dep, app: app}})
    }
  }
}
</script>

<template>
  <IcaoInput :getData="goToView"></IcaoInput>
</template>

<style scoped>

</style>