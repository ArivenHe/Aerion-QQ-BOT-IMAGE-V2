<script>
import IcaoInput from "@/components/Atis/IcaoInput.vue";
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
    goToView(icao) {
      this.$router.push({name: "AtisDetail", params: {id: icao}})
    }
  }
}
</script>

<template>
  <IcaoInput :getData="goToView"></IcaoInput>
  <br>
</template>

<style scoped>

</style>