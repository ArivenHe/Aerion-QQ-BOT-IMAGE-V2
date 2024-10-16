<script>
import Aside from "@/components/Aside/Aside.vue";
import Header from "@/components/Header/Header.vue";
import axios from "axios";

export default {
  name: 'App',
  components: {
    Header,
    Aside
  },
}
</script>

<template>
<div style="padding: 20px">
  <router-view ></router-view>
</div>
</template>

<style>
.common-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-container {
  height: 100%;
  overflow: hidden;
}

.el-aside {
  overflow: hidden;
}

.el-main {
  height: 100%;
  flex: 1;
  overflow-y: auto;
}


.copyright {
  margin-top: auto;
  text-align: center;
  padding: 10px 0;
}


</style>
