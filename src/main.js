import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入样式文件
import './styles/index.css'

// REM适配
// 加载 amfe-flexible
import 'amfe-flexible'

// 引入 axios 请求相关文件
import '@/api/index'

// 引入、注册 vant 相关组件
import { NavBar } from 'vant';
import { Form } from 'vant';
import { Field } from 'vant';
import { Button } from 'vant';
import { Toast } from 'vant';
import { CountDown } from 'vant'
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(CountDown);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')