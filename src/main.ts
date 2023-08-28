import '@/styles/main.scss'
import 'vant/lib/index.css'
import 'virtual:svg-icons-register'
import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
