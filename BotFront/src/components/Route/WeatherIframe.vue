<script>
export default {
  name: "WeatherIframe",
  props:{
    icao:null,
    url:null

  }
}
</script>

<template>
  <div>
    <iframe
        :src="url"
        frameborder="0"
        style="width: 100%; height: 900px;">
    </iframe>
  </div>
</template>

<style scoped>

</style>