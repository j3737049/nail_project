import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import messages from './locals'

import App from './App.vue'
import router from './router'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import Cookies from 'js-cookie'



// 引入 Bootstrap 和 BootstrapVue3 的 CSS 文件
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

router.beforeEach((to, from, next)=>{
    if(to.meta.requireAuth){
        const counter = localStorage.getItem('member') || '{}';
        if(JSON.parse(counter).isLogin){
            next();
        }else{
            if(to.path === '/login'){
                next();
            }else{
                alert("請先登入!");
                next({
                    path:'/login'
                })
            }
        }
    }else{
        next();
    }
})
  
const i18n = createI18n({
    locale: 'zh', // 设置默认语言
    fallbackLocale: 'en', // 设置备用语言
    messages, // 设置语言包
})

const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(ArcoVue)
app.use(pinia)

app.mount('#app')
