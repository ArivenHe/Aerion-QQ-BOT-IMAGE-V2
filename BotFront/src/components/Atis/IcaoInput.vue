<script>
export default {
  name: "IcaoInput",
  props: {
    getData: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      icao: null
    }
  },
  methods: {
    get() {
      this.getData(this.icao);
    }
  }
}
</script>

<template>
  <el-card>
    <h1 style="font-size: 30px">
      <box-icon name='podcast'></box-icon>
      ATIS查询
    </h1>
    <div>
      <el-tag type="info" size="large">本系统仅用于飞行模拟训练，请勿用于实际飞行！</el-tag>
    </div>
    <br>
    <div style="padding: 20px;background-color: #f7f9fc;color: black;border-radius: 20px"><br>
      <el-form-item label="机场ICAO">
        <el-input v-model="icao" placeholder="请输入机场ICAO"></el-input>
      </el-form-item>
    </div>
    <br>
    <div class="search_button">
      <el-button style="background-color: #f7f9fc;width: 100%;border-radius: 20px;" @click="get">
        <box-icon name='search-alt-2'></box-icon>
        <span class="search_button_text">查询</span>
      </el-button>
    </div>
  </el-card>
</template>

<style scoped>
.search_button {
  margin-top: 10px;
}

.search_button_text {
  margin-left: 10px;
  font-size: 15px;
  color: #000;
}
</style>