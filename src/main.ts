import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';


// 引入 Bootstrap 和 BootstrapVue3 的 CSS 文件
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ArcoVue)

app.mount('#app')
