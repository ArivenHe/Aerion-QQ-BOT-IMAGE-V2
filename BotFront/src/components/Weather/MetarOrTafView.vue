<script>
export default {
  name: "MetarOrTafView",
  props:{
    text:null,
    data:null
  }
}
</script>

<template>
<el-card  class="dashboard_card">
  <h1 style="font-size: 40px;color: #409EFF">{{text}}</h1>
  <h1 style="font-size: 30px">{{data}}</h1>
</el-card>
</template>

<style scoped>

</style>