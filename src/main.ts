import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Adtd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/reset.css';
import '@/access'
const app = createApp(App)

app.use(createPinia())
app.use(Adtd)
app.use(router)

app.mount('#app')
