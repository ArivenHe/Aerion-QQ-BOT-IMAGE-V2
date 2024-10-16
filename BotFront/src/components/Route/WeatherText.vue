<script>
export default {
  name: "WeatherText",
  props: {
    data: null
  }
}
</script>

<template>
  <div class="weather"><br>
    <h1> {{ data.airport.gps_code }} & {{ data.airport.iata_code }} /
      {{ data.airport.cn_name }} # {{data.airport.iso_country}}</h1>
    <br>
    <h1>METAR </h1>
    <h3>{{ data.weather.metar }}</h3>
    <br/>
    <h2 style="color: #b25252">发布时间: {{ data.weather.metar_decode.time }}</h2>
    <h2>
      风况: {{ data.weather.metar_decode.wind_dir }}°{{
        data.weather.metar_decode.wind_speed
      }}{{ data.weather.metar_decode.wind_unit }}
    </h2>
    <h2>
      能见度: {{
        data.weather.metar_decode.visibility
      }}{{ data.weather.metar_decode.visibility_unit }}
    </h2>
    <h2>修正海压: {{ data.weather.metar_decode.qnh }}{{
        data.weather.metar_decode.qnh_unit
      }}</h2>
    <h2>温度: {{ data.weather.metar_decode.temperature }} °C</h2>
    <h2>露点温度: {{ data.weather.metar_decode.dewpoint }} °C</h2>
    <h2>预报: {{ data.weather.metar_decode.forcast }}</h2>
    <br/>
    <h1>TAF </h1>
    <h3>{{ data.weather.taf }}</h3>
  </div>
</template>

<style scoped>
.weather {
  margin-left: 30px;
}

.weather h1 {
  font-size: 35px;
}

.weather h2 {
  font-size: 25px;
}

.weather h3 {
  font-size: 20px;
  color: #1CBCE8;
}
</style>