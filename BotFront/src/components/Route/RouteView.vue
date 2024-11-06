<script>
import axios from "axios";
import RouteText from "@/components/Route/RouteText.vue";
import RouteMap from "@/components/Route/RouteMap.vue";
import WeatherIframe from "@/components/Route/WeatherIframe.vue";
import WeatherText from "@/components/Route/WeatherText.vue";
import { ElLoading, ElMessage } from "element-plus";

export default {
  name: "RouteView",
  components: {
    RouteText,
    RouteMap,
    WeatherIframe,
    WeatherText,
  },
  data() {
    return {
      depIcao: this.$route.params.dep,
      appIcao: this.$route.params.app,
      routeData: null,
      depInfo: null,
      appInfo: null,
      loadingInstance: null,
    };
  },
  watch: {
    depIcao: {
      immediate: true,
      handler() {
        this.fetchRouteData();
      }
    },
    appIcao: {
      immediate: true,
      handler() {
        this.fetchRouteData();
      }
    },
  },
  methods: {
    async fetchRouteData() {
      if (!this.depIcao || !this.appIcao) {
        ElMessage.error("Invalid departure or arrival ICAO code.");
        return;
      }

      this.loadingInstance = ElLoading.service({
        text: '加载中...',
        background: 'rgba(255, 255, 255, 0.8)',
      });

      try {
        const res = await axios.get(YOUR_URL);

        if (res.data.status === 200) {
          this.routeData = res.data;
        } else {
          ElMessage.error("Failed to retrieve route data.");
        }
      } catch (err) {
        ElMessage.error("Error fetching route data. Please try again later.");
        console.error(err);
      } finally {
        if (this.loadingInstance) {
          this.loadingInstance.close();
        }
      }
    }
  }
}
</script>

<template>
  <div id="view" class="view" v-if="routeData" v-show="routeData">
    <RouteMap  v-show="routeData" :data="routeData" :app="appIcao" :dep="depIcao"></RouteMap>
    <br />
    <RouteText v-show="routeData" :data="routeData"></RouteText>
  </div>
</template>

<style scoped>
/* Add any necessary styles here */
</style>
