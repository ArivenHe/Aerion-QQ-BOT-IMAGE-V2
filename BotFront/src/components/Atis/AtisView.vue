<script>
import AirportInfo from "@/components/Weather/AirportInfo.vue";
import BackButton from "@/components/CommonUsed/BackButton.vue";
import axios from "axios";
import {ElLoading} from "element-plus";
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();


export default {
  name: "NotamsView",
  components: {
    AirportInfo,
    BackButton,
  },
  data() {
    return {
      id: this.$route.params.id,
      detail: null,
      isPlaying:false
    }
  },
  watch: {
    id: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.getData();
        }
      }
    }
  },
  methods: {
    async getData() {
      try {
        const loading = ElLoading.service({ text: '加载中...', background: 'rgba(255, 255, 255, 1)' ,});
        const res = await axios.post('YOUR_URL', {
          'token': 'ab321818',
          'icao': this.id
        });

        loading.close();
        if (res.status === 200) {
          this.detail = res.data;
          console.log(this.detail);
        }
      } catch (err) {
        console.log(err)
      }
    },

    playVoice(text, lang) {
      if (!this.isPlaying) {
        msg.text = text;
        msg.lang = lang;
        msg.volume = 1;
        msg.rate = 1;
        msg.pitch = 1;
        synth.speak(msg);
        this.isPlaying = true;

        msg.onend = () => {
          this.isPlaying = false;
        };
      } else {
        this.handleStop();
      }
    },
    handleStop() {
      synth.cancel();
      this.isPlaying = false;
    },
    back(){
      this.detail = null;
      this.$router.push({path: '/FindAtis'});
    }
  },
  unmounted() {
    this.detail = null;
    this.isPlaying = false;
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
    <br>
    <h1 style="font-size: 35px;color: #00B7FF">中文 #{{detail.atis.code}}  <el-button :type="isPlaying ? 'danger' : 'primary'" @click="playVoice(detail.atis.zh, 'zh-CN')">
      {{ isPlaying ? '暂停播放' : '播放' }}
    </el-button></h1>
    <h1> {{detail.atis.zh}}</h1>
    <h1 style="font-size: 35px;color: #00B7FF">英文 #{{detail.atis.code}} <el-button :type="isPlaying ? 'danger' : 'primary'" @click="playVoice(detail.atis.en, 'en-US')">
      {{ isPlaying ? '暂停播放' : '播放' }}
    </el-button></h1>
    <h1> {{detail.atis.en}}</h1>
  </el-card>
</template>

<style scoped>

</style>
