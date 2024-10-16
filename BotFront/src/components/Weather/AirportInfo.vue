<script>
export default {
  name: "AirportInfo",
  props:{
    data:Object
  }
}
</script>

<template>
  <h1 style="font-size: 35px;text-align: center">{{ data.airport.gps_code }} & {{ data.airport.iata_code }} /
    {{ data.airport.cn_name }} & {{ data.airport.en_name }} #{{ data.airport.iso_country }} </h1><br>
</template>

<style scoped>

</style>

