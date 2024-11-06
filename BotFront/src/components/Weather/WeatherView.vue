<script>
import axios from "axios";
import AirportInfo from "@/components/Weather/AirportInfo.vue";
import WeatherDetail from "@/components/Weather/WeatherDetail.vue";
import MetarOrTafView from "@/components/Weather/MetarOrTafView.vue";
import {ElLoading} from "element-plus";

export default {
  name: "WeatherView",
  components: {
    WeatherDetail,
    AirportInfo,
    MetarOrTafView,
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal);
        this.getData(newVal);
      }
    }
  },
  data() {
    return {
      detail: null,
      id: this.$route.params.id,
    }
  },
  methods: {
    async getData(icao) {
      try {
        const loading = ElLoading.service({ text: '加载中...', background: 'rgba(255, 255, 255, 1)' });
        const res = await axios.post('YOUR_URL', {
          'token': 'ab321818',
          'icao': icao
        });
        loading.close();
        if (res.data.status === 200) {
          this.detail = res.data;
        }
      } catch (err) {
        console.log(err);
      }
    },
    back() {
      this.detail = null;
      this.$router.push({path: '/FindWeather'});
    }
  }
}
</script>

<template>
  <el-card v-if="detail">
    <div class="back_button">
      <el-button style="background-color: #f7f9fc;" @click="back">
        <box-icon name='left-arrow-alt'></box-icon>
        <span class="back_button_text">返回上一级</span>
      </el-button>
    </div>
    <AirportInfo :data="detail"></AirportInfo>
  </el-card>
  <br>
  <MetarOrTafView v-if="detail" text="METAR" :data="detail.weather.metar"></MetarOrTafView>
  <br>
  <el-card v-if="detail">
    <WeatherDetail :data="detail"></WeatherDetail>
  </el-card>
  <br>
  <MetarOrTafView text="TAF" v-if="detail" :data="detail.weather.taf"></MetarOrTafView>

</template>

<style scoped>

.back_button {
  margin-top: 10px;
}

.back_button_text {
  margin-left: 10px;
  font-size: 15px;
  color: #000;
}
</style>
