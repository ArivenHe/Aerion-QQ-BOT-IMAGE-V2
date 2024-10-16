<script>
export default {
  name: "WeatherDetail",
  props: {
    data: Object
  }
}
</script>

<template>
  <div class="box-card">
    <el-row :gutter="30">
      <el-col :span="4">
        <el-card class="dashboard_card">
          <div class="dashboard_value" style="font-size: 40px;color: #F56C6C">{{ data.weather.metar_decode.time }}</div>
          <div class="dashboard_title" style="font-size: 30px;margin-top: 10px">发布时间</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="dashboard_card">
          <div class="dashboard_value" style="font-size: 40px;">
            {{ data.weather.metar_decode.wind_dir }}°{{
              data.weather.metar_decode.wind_speed
            }}{{ data.weather.metar_decode.wind_unit }}
          </div>
          <div class="dashboard_title" style="font-size: 30px;margin-top: 10px">风信息</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="dashboard_card">
          <div class="dashboard_value" style="font-size: 40px;">{{ data.weather.metar_decode.qnh }}{{ data.weather.metar_decode.qnh_unit }}</div>
          <div class="dashboard_title" style="font-size: 30px;margin-top: 10px">修正海压</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="dashboard_card">
          <div class="dashboard_value" style="font-size: 40px;">{{ data.weather.metar_decode.temperature }}℃ / {{ data.weather.metar_decode.dewpoint }}℃</div>
          <div class="dashboard_title" style="font-size: 30px;margin-top: 10px">温度信息</div>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="dashboard_card">
          <div class="dashboard_value" style="font-size: 40px;">{{ data.weather.metar_decode.visibility }}{{ data.weather.metar_decode.visibility_unit }}</div>
          <div class="dashboard_title" style="font-size: 30px;margin-top: 10px">能见度信息</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<style scoped>

</style>