import './mock'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

// 创建 Pinia 实例
const pinia = createPinia()

const app =createApp(App)
app.use(pinia) // 将 Pinia 插件添加到 Vue 应用中

app.mount('#app')
