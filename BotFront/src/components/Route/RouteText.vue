<script>
export default {
  name: "RouteText",
  props: {
    data: null,
  },
  data() {
    return {
      tableData: [],
      dep:this.$route.params.dep,
      app:this.$route.params.app,
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        console.log(newVal);
        if (newVal && newVal.coordinate) {
          this.formatTableData(newVal.coordinate);
        }
      },
    },
  },
  computed: {
    formattedDistance() {
      return this.data.nm.toFixed(2);
    },
  },
  methods: {
    formatTableData(coordinate) {
      this.tableData = Object.keys(coordinate).map((key) => {
        return {
          name: key,
          lonx: coordinate[key].lonx,
          laty: coordinate[key].laty,
        };
      });
    },
  },
};
</script>

<template>
  <el-card>
    <h1  style="color: #ffae00; font-size: 40px">{{dep}}✈{{app}} 共 {{data.NavPoint.length}} 航点 , 飞行距离共 {{ formattedDistance }} 海里</h1>
    <br>
    <h1 style="font-size: 35px">完整航路</h1>
    <h1 style="color: #00B7FF; font-size: 30px">{{ data.route }}</h1>
    <h1 style="font-size: 30px"></h1>
    <br>
  </el-card>
</template>

<style scoped></style>
