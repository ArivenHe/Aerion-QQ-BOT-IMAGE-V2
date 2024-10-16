// src/main.js

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import 'boxicons'
import VueCookies from "vue-cookies";
import mitt from 'mitt';
import CommonlyUsed from './controllers/CommonlyUsed';
import 'animate.css';
import { createPinia } from 'pinia'
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import "mapbox-gl/dist/mapbox-gl.css";

const eventBus = mitt();
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(ElementPlus)
app.use(VueCookies)
app.provide('eventBus', eventBus);


const commonlyUsedInstance = new CommonlyUsed();
app.config.globalProperties.$common = commonlyUsedInstance;


app.mount('#app')
