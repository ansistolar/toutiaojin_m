import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入样式文件
import './styles/index.css'

// REM适配
// 加载 amfe-flexible
import 'amfe-flexible'

// 引入、注册 vant 相关组件
import { Button } from 'vant'
Vue.use(Button)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')