<script>
import IcaoInput from "@/components/Weather/IcaoInput.vue";
import WeatherView from "@/components/Weather/WeatherView.vue";
import axios from "axios";

export default {
  name: "Weather",
  components: {
    IcaoInput,
    WeatherView,
  },
  data() {
    return {
      weatherData: null
    }
  },
  methods: {
    goToView(icao) {
      this.$router.push({name: "weatherDetail", params: {id: icao}})
    }
  }
}
</script>

<template>
  <IcaoInput :getData="goToView"></IcaoInput>
  <br>
  <WeatherView v-if="weatherData" :data="weatherData"></WeatherView>
</template>

<style scoped>

</style>